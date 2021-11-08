using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace Models.Auth
{
    public static class AuthService
    {
        static readonly HttpClient client = new HttpClient();

        public static async Task<bool> IsAuthenticatedAsync(string Hash, string PublicKey)
        {
            try
            {
                Hash.Replace(' ', '+');
                HttpResponseMessage response = await client.GetAsync($"http://authentication_service:5000/auth?hash={Hash}&pubKey={PublicKey}");
                string responseBody = await response.Content.ReadAsStringAsync();
                Console.WriteLine(response);
                Console.WriteLine(responseBody);
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }
        }
    }
}
