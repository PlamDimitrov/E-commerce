#nullable disable
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ecommerce_API.Data;
using ecommerce_API.Models;
using Microsoft.Net.Http.Headers;
using ecommerce_API.Entities;

namespace ecommerce_API.Controllers

{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly JwtSettings _jwtSettings;
        private readonly ecommerce_APIContext _context;

        public UsersController(ecommerce_APIContext context, JwtSettings jwtSettings)
        {
            _context = context;
            _jwtSettings = jwtSettings;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {
            try
            {
                return await _context.User.ToListAsync();
            }
            catch (Exception)
            {
                throw new Exception("Error: Not possible to get all users!");
            }
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            try
            {
                var user = await _context.User.FindAsync(id);

                if (user == null)
                {
                    return NotFound();
                }

                return user;
            }
            catch (Exception)
            {

                throw new Exception("Error: Not possible to get the user!");
            }
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw new Exception("Error: User not eddited!");
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Route("register")]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            var userWithHashedPassword = user;
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(user.password);
            userWithHashedPassword.password = passwordHash;
            try
            {
                _context.User.Add(userWithHashedPassword);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetUser", new { id = user.Id }, user);

            }
            catch (Exception)
            {

                throw new Exception("Error: User not created!");
            }
            
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<UserLogin>> LogInUser(UserLogin userLogin)
        {
            bool verified = false;
            var Token = new UserTokens();
            try
            {
                var userFromDataBase = await _context.User
                    .Where(u =>  u.userName == userLogin.userName )
                    .ToListAsync();
                if (userFromDataBase.Count != 0)
                {
                    verified = BCrypt.Net.BCrypt.Verify(userLogin.password, userFromDataBase.FirstOrDefault().password);
                }
                if (userFromDataBase != null && verified == true)
                {
                    var userData = userFromDataBase.FirstOrDefault();
                    Token = JwtHelpers.JwtHelpers.GenTokenkey(new UserTokens()
                    {
                        GuidId = Guid.NewGuid(),
                        UserName = userData.userName,
                        Id = userData.Id,
                        ExpiredTime = DateTime.Now.AddDays(2)
                    }, _jwtSettings);

                    Response.Cookies.Append("ecom-auth-token", Token.Token, new CookieOptions()
                    {
                        Expires = DateTimeOffset.Now.AddHours(24),
                        Path = "/",
                        HttpOnly = true,
                        Secure = true,
                    });

                    return Ok(Token);

                }
                else
                {
                    throw new Exception("Error: Wrong username or password!");
                }
                

            }
            catch (Exception)
            {
                throw new Exception("Error: Wrong username or password!");
            }

        }

        [HttpPost]
        [Route("logout")]
        public async Task<ActionResult> LogoutUser(string userId, UserTokens token)
        {
            var tokenValue = new ExpiredToken();
            tokenValue.ExpiredTokenValue = token.Token;
            tokenValue.ExpiredTime = token.Validaty;
            
            _context.ExpiredTokens.Add(tokenValue);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            try
            {
                _context.User.Remove(user);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception)
            {

                throw new Exception("Error: User not deleted!");
            }

            
        }

        private bool UserExists(int id)
        {
            return _context.User.Any(e => e.Id == id);
        }
    }
}
