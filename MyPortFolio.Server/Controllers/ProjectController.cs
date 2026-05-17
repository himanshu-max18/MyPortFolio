using Microsoft.AspNetCore.Mvc;
using MyPortFolio.Server.DTOs;
using MyPortFolio.Server.Services.Interfaces;

namespace MyPortFolio.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly ILogger<ProjectController> _logger;
        private readonly IProjectService _projectService;

        public ProjectController(ILogger<ProjectController> logger, IProjectService projectService)
        {
            _logger = logger;
            _projectService = projectService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectDto>>> Get(CancellationToken ct)
        {
            var result = await _projectService.GetProjectDtosAsync(ct);
            return Ok(result);
        }

        [HttpGet("featured")]
        public async Task<ActionResult<IEnumerable<ProjectDto>>> GetFeatured(CancellationToken ct)
        {
            var result = await _projectService.GetFeaturedProjectDtosAsync(ct);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectDto>> GetById(int id, CancellationToken ct)
        {
            var result = await _projectService.GetProjectDtoByIdAsync(id, ct);

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<ProjectDto>> Create([FromBody] ProjectDto projectDto, CancellationToken ct)
        {
            try
            {
                var created = await _projectService.CreateProjectDtoAsync(projectDto, ct);
                return CreatedAtAction( nameof(GetById), new { id = created.Id }, created );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while creating the project.");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ProjectDto>> Update(int id, [FromBody] ProjectDto projectDto, CancellationToken ct)
        {
            try
            {
                var updated = await _projectService.UpdateProjectDtoAsync(id, projectDto, ct);
                return Ok(updated);
            }
            catch (KeyNotFoundException ex)
            {
                _logger.LogWarning(ex.Message);
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating the project.");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id, CancellationToken ct)
        {
            try
            {
                await _projectService.DeleteProjectDtoAsync(id, ct);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                _logger.LogWarning(ex.Message);
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting the project.");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}