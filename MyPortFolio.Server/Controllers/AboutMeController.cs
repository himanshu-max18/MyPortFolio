using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyPortFolio.Server.DTOs;
using MyPortFolio.Server.Services.Interfaces;

namespace MyPortFolio.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AboutMeController : ControllerBase
    {
        private readonly ILogger<AboutMeController> _logger;
        private readonly IAboutMeService _aboutMeService;

        public AboutMeController(ILogger<AboutMeController> logger, IAboutMeService aboutMeService)
        {
            this._logger = logger;
            this._aboutMeService = aboutMeService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AboutMeDto>>> Get(CancellationToken ct)
        {
            try
            {
                var result = await _aboutMeService.GetAboutMeDtosAsync(ct);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred in GetAll");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AboutMeDto>> GetById(int id, CancellationToken ct)
        {
            try
            {
                var result = await _aboutMeService.GetAboutMeDtoByIdAsync(id, ct);
                if (result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred in GetById");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPost]
        public async Task<ActionResult<AboutMeDto>> Create([FromBody] AboutMeDto aboutMeDto, CancellationToken ct)
        {
            try
            {
                var created = await _aboutMeService.CreateAboutMeDtoAsync(aboutMeDto, ct);
                return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred in Create");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<AboutMeDto>> Update(int id, [FromBody] AboutMeDto aboutMeDto, CancellationToken ct)
        {
            try
            {
                var updateAboutMe = await _aboutMeService.UpdateAboutMeDtoAsync(id, aboutMeDto, ct);
                if (updateAboutMe == null)
                {
                    return NotFound();
                }
                return Ok(updateAboutMe);
            }
            catch (KeyNotFoundException ex)
            {
                _logger.LogWarning(ex.Message);
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id, CancellationToken ct)
        {
            try
            {
                await _aboutMeService.DeleteAboutMeDtoAsync(id, ct);
                return NoContent(); 
            }
            catch (KeyNotFoundException ex)
            {
                _logger.LogWarning(ex.Message);
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred During Delete");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
