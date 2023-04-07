using System;
namespace webAPI.Domain.DTOs.StatisticsDto
{
	public class JobStatusStatisticsDto
	{
		public int Delayed { get; set; }

        public int Completed { get; set; }

        public int Cancelled { get; set; }

        public int PendingApproval { get; set; }

        public int Approved { get; set; }

        public int ReadyForPrinting { get; set; }

        public int Printing { get; set; }

        public int QualityControl { get; set; }

        public int Finishing { get; set; }

        public int Packaging { get; set; }

        public int Shipping { get; set; }

        public int Delivered { get; set; }

        public int Billing { get; set; }

        public int PaymentReceived { get; set; }

        public int Archived { get; set; }

        public int New { get; set; }
    }
}