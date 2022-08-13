using AltEvent.Api.Utils;
using AltEvent.Core.Dtos;
using AltEvent.Core.Models;
using AltEvent.Core.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace AltEvent.Api.Controllers
{
    [ApiController]
    [Route("api/v1/companies")]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyRepository companyRepository;

        public CompanyController(ICompanyRepository companyRepository)
        {
            this.companyRepository = companyRepository;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Company>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorResponse))]
        public async Task<ActionResult<IEnumerable<Company>>> Get(
            [FromQuery] CompanyQuery query)
        {
            try
            {
                var companies = await companyRepository.GetAsync(query);
                return Ok(companies);
            }
            catch (Exception ex)
            {
                var message = ex.InnerException?.Message ?? ex.Message;
                return ErrorResponse.BadRequest(message);
            }
        }
    }
}
