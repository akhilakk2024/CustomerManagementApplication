using CustomerApi.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using CustomerApi.Models;

namespace CustomerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private  CustomerService services = new CustomerService();
        [HttpGet("GetCustomerData")]
        public string GetCustomerData()
        {
            customer response = services.GetCustomerData();
            string value = JsonConvert.SerializeObject(response);
            return value;
        }
        [HttpPost("addCustomer")]
        public string addCustomer(CustomerDetails CustomerData)
        {
            string response = services.addNewCustomer(CustomerData);
            string value = JsonConvert.SerializeObject(response);
            return value;
        }
        [HttpGet("GetCustomerDataById/{customerid}")]
        public string GetCustomerDataById(int customerid)
        {
            CustomerDetails response = services.FetchCustomerDataById(customerid);
            string value = JsonConvert.SerializeObject(response);
            return value;
        }
        [HttpPut("updateCustomer")]
        public string UdateCustomer(CustomerDetails CustomerData)
        {
            customer response = services.UpdateCustomerDetails(CustomerData);
            string value = JsonConvert.SerializeObject(response);
            return value;
        }
        [HttpDelete("deleteCustomer/{customerid}")]
        public string DeleteCustomer(int customerid)
        {
            customer response = services.DeleteCustomerDataById(customerid);
            string value = JsonConvert.SerializeObject(response);
            return value;
        }
    }
}
