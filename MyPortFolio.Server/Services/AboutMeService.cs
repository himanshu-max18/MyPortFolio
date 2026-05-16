using MyPortFolio.Server.DTOs;
using MyPortFolio.Server.Models;
using MyPortFolio.Server.Repositories.Interfaces;
using MyPortFolio.Server.Services.Interfaces;

namespace MyPortFolio.Server.Services
{
    public class AboutMeService : IAboutMeService
    {
        private readonly IAboutMeRepository _aboutMeRepository;
        public AboutMeService(IAboutMeRepository aboutMeRepository)
        {
            this._aboutMeRepository = aboutMeRepository;
        }

        public async Task<IEnumerable<AboutMeDto>> GetAboutMeDtosAsync(CancellationToken ct = default)
        {
            var aboutMeList =  await _aboutMeRepository.GetAboutMeAsync(ct);
            return aboutMeList.Select(MapToDto);
        }

        public async Task<AboutMeDto?> GetAboutMeDtoByIdAsync(int id, CancellationToken ct = default)
        {
            var aboutMe = await _aboutMeRepository.GetAboutMeByIdAsync(id, ct);

            if (aboutMe == null)
                return null;

            return MapToDto(aboutMe);
        }
        public async Task<AboutMeDto> CreateAboutMeDtoAsync(AboutMeDto aboutMeDto, CancellationToken ct = default)
        {
            var aboutMe = new AboutMe
            {
                FullName = aboutMeDto.FullName,
                Tagline = aboutMeDto.Tagline,
                Bio = aboutMeDto.Bio,
                Email = aboutMeDto.Email,
                GitHubUrl = aboutMeDto.GitHubUrl,
                LinkedInUrl = aboutMeDto.LinkedInUrl,
                ResumeUrl = aboutMeDto.ResumeUrl
            };

            // Repository ko do
            var created = await _aboutMeRepository.CreateAboutMeAsync(aboutMe, ct);

            // Model → DTO return karo
            return MapToDto(created);
        }

        public async Task DeleteAboutMeDtoAsync(int id, CancellationToken ct = default)
        {
            var aboutMe = await _aboutMeRepository.GetAboutMeByIdAsync(id, ct);
            if (aboutMe == null)
                throw new KeyNotFoundException($"AboutMe with id {id} not found.");

            await _aboutMeRepository.DeleteAboutMeAsync(aboutMe, ct);
        }

        public async Task<AboutMeDto> UpdateAboutMeDtoAsync(int id, AboutMeDto aboutMeDto, CancellationToken ct = default)
        {
            if (id != aboutMeDto.Id)
                throw new ArgumentException("URL ID and Body ID do not match.");

            var aboutMe = new AboutMe
            {
                Id = aboutMeDto.Id,
                FullName = aboutMeDto.FullName,
                Tagline = aboutMeDto.Tagline,
                Bio = aboutMeDto.Bio,
                Email = aboutMeDto.Email,
                GitHubUrl = aboutMeDto.GitHubUrl,
                LinkedInUrl = aboutMeDto.LinkedInUrl,
                ResumeUrl = aboutMeDto.ResumeUrl
            };

            // Repository ko do     
            var updated = await _aboutMeRepository.UpdateAboutMeAsync(aboutMe, id, ct);

            // Model → DTO return karo
            return MapToDto(updated);
        }

        private static AboutMeDto MapToDto(AboutMe aboutMe) => new()
        {

            Id = aboutMe.Id,
            FullName = aboutMe.FullName,
            Tagline = aboutMe.Tagline,
            Bio = aboutMe.Bio,
            Email = aboutMe.Email,
            GitHubUrl = aboutMe.GitHubUrl,
            LinkedInUrl = aboutMe.LinkedInUrl,
            ResumeUrl = aboutMe.ResumeUrl

        };
    }
}
