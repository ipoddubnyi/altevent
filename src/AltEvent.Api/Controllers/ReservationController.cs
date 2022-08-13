using AltEvent.Api.Utils;
using AltEvent.Core.Dtos;
using AltEvent.Core.Models;
using AltEvent.Core.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AltEvent.Api.Controllers
{
    [ApiController]
    [Route("api/v1/reservations")]
    public class ReservationController : ControllerBase
    {
        private readonly IReservationRepository reservationRepository;
        private readonly IEventRepository eventRepository;

        public ReservationController(
            IReservationRepository reservationRepository,
            IEventRepository eventRepository)
        {
            this.reservationRepository = reservationRepository;
            this.eventRepository = eventRepository;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Reservation))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorResponse))]
        public async Task<ActionResult<Reservation>> Get(
            [FromRoute] long id,
            [FromQuery] int code)
        {
            try
            {
                var reservation = await reservationRepository.GetAsync(id);
                if (reservation == null)
                    return ErrorResponse.BadRequest(
                        "Reservation is not found.",
                        ErrorResponse.ERROR_RESERVATION_NOT_FOUND);

                if (reservation.AccessCode != code)
                    return ErrorResponse.BadRequest(
                        "Reservation access code is not valid.",
                        ErrorResponse.ERROR_RESERVATION_CODE_NOT_VALID);

                return Ok(reservation);
            }
            catch (Exception ex)
            {
                var message = ex.InnerException?.Message ?? ex.Message;
                return ErrorResponse.BadRequest(message);
            }
        }

        [HttpGet("{id}/event")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Event))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorResponse))]
        public async Task<ActionResult<Event>> GetEvent(
            [FromRoute] long id,
            [FromQuery] int code)
        {
            try
            {
                var reservation = await reservationRepository.GetAsync(id);
                if (reservation == null)
                    return ErrorResponse.BadRequest(
                        "Reservation is not found.",
                        ErrorResponse.ERROR_RESERVATION_NOT_FOUND);

                if (reservation.AccessCode != code)
                    return ErrorResponse.BadRequest(
                        "Reservation access code is not valid.",
                        ErrorResponse.ERROR_RESERVATION_CODE_NOT_VALID);

                var evnt = await eventRepository.GetAsync(reservation.EventId);
                if (evnt == null)
                    return ErrorResponse.BadRequest(
                        "Event cannot be created.",
                        ErrorResponse.ERROR_EVENT_NOT_FOUND);

                return Ok(evnt);
            }
            catch (Exception ex)
            {
                var message = ex.InnerException?.Message ?? ex.Message;
                return ErrorResponse.BadRequest(message);
            }
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(ReservationCreateResultDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorResponse))]
        public async Task<ActionResult<ReservationCreateResultDto>> Create(
            [FromBody] ReservationCreateDto dto)
        {
            try
            {
                var evnt = await eventRepository.GetAsync(dto.EventId);
                if (evnt == null)
                    return ErrorResponse.BadRequest(
                            "Event cannot be created.",
                            ErrorResponse.ERROR_EVENT_NOT_FOUND);

                if (evnt.Reservations.Count >= evnt.Capacity)
                    return ErrorResponse.BadRequest(
                        "Event is full.",
                        ErrorResponse.ERROR_EVENT_IS_FULL);

                var reservation = await reservationRepository.CreateAsync(dto);
                if (reservation == null)
                    return ErrorResponse.BadRequest(
                        "Reservation cannot be created.",
                        ErrorResponse.ERROR_RESERVATION_NOT_CREATED);

                return StatusCode(StatusCodes.Status201Created, new ReservationCreateResultDto()
                {
                    Reservation = reservation,
                    AccessCode = reservation.AccessCode,
                });
            }
            catch (Exception ex)
            {
                var message = ex.InnerException?.Message ?? ex.Message;
                return ErrorResponse.BadRequest(message);
            }
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Reservation))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorResponse))]
        public async Task<ActionResult<Reservation>> Update(
            [FromRoute] long id,
            [FromQuery] int code,
            [FromBody] ReservationUpdateDto dto)
        {
            try
            {
                var reservation = await reservationRepository.UpdateAsync(id, dto);
                if (reservation == null)
                    return ErrorResponse.BadRequest(
                        "Reservation cannot be updated.",
                        ErrorResponse.ERROR_RESERVATION_NOT_UPDATED);

                if (reservation.AccessCode != code)
                    return ErrorResponse.BadRequest(
                        "Reservation access code is not valid.",
                        ErrorResponse.ERROR_RESERVATION_CODE_NOT_VALID);

                return Ok(reservation);
            }
            catch (Exception ex)
            {
                var message = ex.InnerException?.Message ?? ex.Message;
                return ErrorResponse.BadRequest(message);
            }
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorResponse))]
        public async Task<IActionResult> Delete(
            [FromRoute] long id,
            [FromQuery] int code)
        {
            try
            {
                var reservation = await reservationRepository.GetAsync(id);
                if (reservation == null)
                    return ErrorResponse.BadRequest(
                        "Reservation is not found.",
                        ErrorResponse.ERROR_RESERVATION_NOT_FOUND);

                if (reservation.AccessCode != code)
                    return ErrorResponse.BadRequest(
                        "Reservation access code is not valid.",
                        ErrorResponse.ERROR_RESERVATION_CODE_NOT_VALID);

                await reservationRepository.DeleteAsync(id);
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
