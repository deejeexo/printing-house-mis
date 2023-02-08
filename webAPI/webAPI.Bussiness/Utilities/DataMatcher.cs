using System;
using System.Text.RegularExpressions;

namespace webAPI.Bussiness.Utilities
{
	public class DataMatcher
	{
        public static bool MatchClientEmail(string email)
        {
            Regex validateEmailRegex = new Regex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$", RegexOptions.IgnoreCase);
            return !validateEmailRegex.IsMatch(email);
        }

        public static bool MatchEmployeeEmail(string email)
        {
            Regex validateEmailRegex = new Regex(@"^[^@\s]+@printhaus\.com$", RegexOptions.IgnoreCase);
            return !validateEmailRegex.IsMatch(email);
        }
    }
}

