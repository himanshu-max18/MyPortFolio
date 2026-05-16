using Microsoft.AspNetCore.Mvc;
using MyPortFolio.Server.DTOs;
using MyPortFolio.Server.Services.Interfaces;

namespace MyPortFolio.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExperienceController : ControllerBase
    {
        private readonly ILogger<ExperienceController> _logger;
        private readonly IExperienceService _experienceService;

        public ExperienceController(ILogger<ExperienceController> logger, IExperienceService experienceService)
        {
            _logger = logger;
            _experienceService = experienceService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExperienceDto>>> Get(CancellationToken ct)
        {
            var result = await _experienceService.GetExperienceDtosAsync(ct);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ExperienceDto>> GetById(int id, CancellationToken ct)
        {
            var result = await _experienceService.GetExperienceDtoByIdAsync(id, ct);

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<ExperienceDto>> Create([FromBody] ExperienceDto experienceDto, CancellationToken ct)
        {
            try
            {
                var created = await _experienceService.CreateExperienceDtoAsync(experienceDto, ct);
                return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred in Create");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ExperienceDto>> Update(int id, [FromBody] ExperienceDto experienceDto, CancellationToken ct)
        {
            try
            {
                var updated = await _experienceService.UpdateExperienceDtoAsync(id, experienceDto, ct);
                return Ok(updated);
            }
            catch (KeyNotFoundException ex)
            {
                _logger.LogWarning(ex.Message);
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred in Update");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id, CancellationToken ct)
        {
            try
            {
                await _experienceService.DeleteExperienceDtoAsync(id, ct);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                _logger.LogWarning(ex.Message);
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred in Delete");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}