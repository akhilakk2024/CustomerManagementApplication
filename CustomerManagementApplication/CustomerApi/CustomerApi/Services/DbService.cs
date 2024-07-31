using System.Data;
using System.Data.SqlClient;

namespace CustomerApi.Services
{
    public class DbService
    {
        public string conStr { get; set; }

        public DbService()
        {
            this.conStr = @"Server=LAPTOP-H4C7TFRF\SQLEXPRESS;Database=CustomerDB;Integrated Security=true";

        }
        public DataSet DoQuery(string query)
        {
            DataSet ds = new DataSet();
           
                using (SqlConnection con = new SqlConnection(conStr))
                using (SqlCommand command = new SqlCommand(query, con))
                using (SqlDataAdapter adapter = new SqlDataAdapter(command))
                {
                    try
                    {
                        con.Open();
                        adapter.Fill(ds);
                    }
                    catch (Exception ex)
                    {

                        Console.WriteLine("Database error: " + ex.Message);
                        throw;
                    }
                    finally
                    {
                        if (con.State != ConnectionState.Closed)
                            con.Close();
                    }
               
            }
            return ds;
        }
    }
}
