using MyPortFolio.Server.DTOs;
using MyPortFolio.Server.Models;
using MyPortFolio.Server.Repositories.Interfaces;
using MyPortFolio.Server.Services.Interfaces;

namespace MyPortFolio.Server.Services
{
    public class ContactService : IContactService
    {
        private readonly IContactRepository _contactRepository;
        public ContactService(IContactRepository contactRepository)
        {
            this._contactRepository = contactRepository;
        }
        
        public async Task<IEnumerable<ContactResponseDto>> GetContactDtoAsync(CancellationToken ct = default)
        {
            var contacts = await _contactRepository.GetContactsAsync(ct);
            return contacts.Select(MapToDto);
        }

        public async Task<ContactResponseDto?> GetContactDtoByIdAsync(int id, CancellationToken ct = default)
        {
            var contact = await _contactRepository.GetContactByIdAsync(id, ct);
            if (contact == null) return null;
            return MapToDto(contact);
        }

        public async Task<ContactResponseDto> CreateContactDtoAsync(CreateContactDto contactDto, CancellationToken ct = default)
        {
            var contact = new Contact
            {
                Name = contactDto.Name,
                Email = contactDto.Email,
                Message = contactDto.Message,
            };

            var createdContact = await _contactRepository.CreateContactAsync(contact, ct);
            return MapToDto(createdContact);
        }

        public async Task<ContactResponseDto> MarkAsReadAsync(int id, CancellationToken ct = default)
        {
            var contact = await _contactRepository.MarkAsReadAsync(id, ct); 
            return MapToDto(contact);
        }

        public async Task DeleteContactAsync(int id, CancellationToken ct = default)
        {
            await _contactRepository.DeleteContactAsync(id, ct);
        }

        private static ContactResponseDto MapToDto(Contact contact) => new()
        {
            Id = contact.Id,
            Name = contact.Name,
            Email = contact.Email,
            Message = contact.Message,
            IsRead = contact.IsRead,
            SentAt = contact.SentAt
        };
    }
}