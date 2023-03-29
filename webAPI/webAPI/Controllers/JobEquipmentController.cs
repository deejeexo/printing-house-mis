using System;
using Microsoft.AspNetCore.Mvc;
using webAPI.Bussiness.Services.IServices;

namespace webAPI.Controllers
{
	[ApiController]
	[Route(template: "jobEquipment")]
	public class JobEquipmentController : ControllerBase
	{
		private readonly IJobEquipmentService _jobEquipmentService;

		public JobEquipmentController(IJobEquipmentService jobEquipmentService)
		{
			this._jobEquipmentService = jobEquipmentService;
		}
	}
}

