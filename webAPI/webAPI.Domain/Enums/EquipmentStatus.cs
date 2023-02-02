using System;
namespace webAPI.Domain.Enums
{
	public enum EquipmentStatus
	{
        InService,
        OutOfService,
        NeedMaintenance,
        ScheduledForMaintenance,
        InRepair,
        AwaitingParts,
        Operational,
        Inactive,
        Decommissioned,
        InUse
    }
}

