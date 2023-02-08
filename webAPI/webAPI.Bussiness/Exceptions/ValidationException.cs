using System;
namespace webAPI.Exceptions
{
    public class ValidationException : Exception
    {
        public ValidationException(Dictionary<string, List<string>> message)
        {
            Messages = message;
        }

        public Dictionary<string, List<string>> Messages { get; set; }
    }
}

