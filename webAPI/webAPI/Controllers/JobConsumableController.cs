using System;
using Microsoft.AspNetCore.Mvc;
using webAPI.Bussiness.Services.IServices;

namespace webAPI.Controllers
{
	[ApiController]
	[Route(template: "jobConsumable")]
	public class JobConsumableController : ControllerBase
	{
		private readonly IJobConsumableService _jobConsumableService;

		public JobConsumableController(IJobConsumableService jobConsumableService)
		{
			this._jobConsumableService = jobConsumableService;
		}
	}
}

