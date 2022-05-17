namespace ecommerce_API.Entities
{
    public class ExpiredToken
    {
        public int Id { get; set; }
        public string ExpiredTokenValue { get; set; }
        public TimeSpan ExpiredTime { get; set; }
    }
}
