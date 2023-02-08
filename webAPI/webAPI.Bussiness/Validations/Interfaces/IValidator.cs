using System;
namespace webAPI.Bussiness.Validations
{
	public interface IValidator<T> where T : class
	{
		Task<bool> Validate(T value);

		void AddError(string key, string errorMessage);

		Dictionary<string, List<string>> Errors { get; set; }
	}
}

