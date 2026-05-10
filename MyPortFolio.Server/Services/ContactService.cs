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
        
        public async Task<IEnumerable<ContactDto>> GetContactDtoAsync(CancellationToken ct = default)
        {
            var contacts = await _contactRepository.GetContactsAsync(ct);
            return contacts.Select(c => new ContactDto
            {
                Name = c.Name,
                Email = c.Email,
                Message = c.Message
            });
        }

        public async Task<ContactDto?> GetContactDtoByIdAsync(int id, CancellationToken ct = default)
        {
            var contact = await _contactRepository.GetContactByIdAsync(id, ct);
            if (contact == null) return null;
            return new ContactDto
            {
                Name = contact.Name,
                Email = contact.Email,
                Message = contact.Message
            };
        }

        public async Task<ContactDto> CreateContactDtoAsync(ContactDto contactDto, CancellationToken ct = default)
        {
            var contact = new Contact
            {
                Name = contactDto.Name,
                Email = contactDto.Email,
                Message = contactDto.Message,
            };

            var createdContact = await _contactRepository.CreateContactAsync(contact, ct);

            var result = new ContactDto
            {
                Name = createdContact.Name,
                Email = createdContact.Email,
                Message = createdContact.Message
            };
            return result;
        }
    }
}