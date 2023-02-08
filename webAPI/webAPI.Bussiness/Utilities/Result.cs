using System;
using System.Diagnostics.CodeAnalysis;

namespace webAPI.Bussiness.Utilities
{
	public struct Result<T>
	{
        public Exception? Exception { get; set; } = null;
        [AllowNull]
        public T Value { get; set; } = default;

        public Result(T value)
        {
            this.Value = value;
        }

        public Result(Exception exception)
        {
            this.Exception = exception;
        }

        public static implicit operator Result<T>(T value)
        {
            return new Result<T>(value);
        }
    }
}

