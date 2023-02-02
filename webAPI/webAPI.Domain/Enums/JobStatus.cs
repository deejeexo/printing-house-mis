using System;
namespace webAPI.Domain.Enums
{
    public enum JobStatus
    {
        Delayed,
        Completed,
        Cancelled,
        PendingApproval,
        InQueue,
        InReview,
        ReadyForPrinting,
        Printing,
        Proofing,
        QualityControl,
        Finishing,
        Packaging,
        Shipping,
        Delivered,
        Billing,
        PaymentReceived,
        Archived
    }
}

