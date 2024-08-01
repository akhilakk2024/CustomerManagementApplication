namespace CustomerApi.Models
{
    public class CustomerDetails
    {
        public int CustomerCode { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string MobileNo { get; set; }
        public string GeoLocation { get; set; }
    }
    public class customer
    {
        public List<CustomerDetails> Details { get; set; }
        public customer()
        {
            Details = new List<CustomerDetails>();
        }
    }
}
