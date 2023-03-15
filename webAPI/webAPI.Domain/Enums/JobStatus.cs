using System;
namespace webAPI.Domain.Enums
{
    public enum JobStatus
    {
        Empty,
        Delayed,
        Completed,
        Cancelled,
        PendingApproval,
        Approved,
        ReadyForPrinting,
        Printing,
        QualityControl,
        Finishing,
        Packaging,
        Shipping,
        Delivered,
        Billing,
        PaymentReceived,
        Archived,
        New
    }
}