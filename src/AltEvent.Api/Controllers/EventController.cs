using AltEvent.Api.Utils;
using AltEvent.Core.Dtos;
using AltEvent.Core.Models;
using AltEvent.Core.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AltEvent.Api.Controllers
{
    [ApiController]
    [Route("api/v1/companies/{companyId}/events")]
    public class EventController : ControllerBase
    {
        private readonly IEventRepository eventRepository;

        public EventController(IEventRepository eventRepository)
        {
            this.eventRepository = eventRepository;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Event>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorResponse))]
        public async Task<ActionResult<IEnumerable<Event>>> Get(
            [FromRoute] long companyId,
            [FromQuery] EventQuery query)
        {
            try
            {
                var events = await eventRepository.GetAsync(companyId, query);
                return Ok(events);
            }
            catch (Exception ex)
            {
                var message = ex.InnerException?.Message ?? ex.Message;
                return ErrorResponse.BadRequest(message);
            }
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Event))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorResponse))]
        public async Task<ActionResult<Event>> Get(
            [FromRoute] long id)
        {
            try
            {
                var evnt = await eventRepository.GetAsync(id);
                if (evnt == null)
                    return ErrorResponse.BadRequest(
                        "Event is not found.",
                        ErrorResponse.ERROR_EVENT_NOT_FOUND);

                return Ok(evnt);
            }
            catch (Exception ex)
            {
                var message = ex.InnerException?.Message ?? ex.Message;
                return ErrorResponse.BadRequest(message);
            }
        }

        [Authorize]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Event))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorResponse))]
        public async Task<ActionResult<Event>> Create(
            [FromRoute] long companyId,
            [FromBody] EventCreateDto dto)
        {
            try
            {
                var evnt = await eventRepository.CreateAsync(companyId, dto);
                if (evnt == null)
                    return ErrorResponse.BadRequest(
                        "Event cannot be created.",
                        ErrorResponse.ERROR_EVENT_NOT_CREATED);

                return StatusCode(StatusCodes.Status201Created, evnt);
            }
            catch (Exception ex)
            {
                var message = ex.InnerException?.Message ?? ex.Message;
                return ErrorResponse.BadRequest(message);
            }
        }

        [Authorize]
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Event))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorResponse))]
        public async Task<ActionResult<Event>> Update(
            [FromRoute] long id,
            [FromBody] EventUpdateDto dto)
        {
            try
            {
                var evnt = await eventRepository.UpdateAsync(id, dto);
                if (evnt == null)
                    return ErrorResponse.BadRequest(
                        "Event cannot be updated.",
                        ErrorResponse.ERROR_EVENT_NOT_UPDATED);

                return Ok(evnt);
            }
            catch (Exception ex)
            {
                var message = ex.InnerException?.Message ?? ex.Message;
                return ErrorResponse.BadRequest(message);
            }
        }

        [Authorize]
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorResponse))]
        public async Task<IActionResult> Delete(
            [FromRoute] long id)
        {
            try
            {
                await eventRepository.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                var message = ex.InnerException?.Message ?? ex.Message;
                return ErrorResponse.BadRequest(message);
            }
        }
    }
}
