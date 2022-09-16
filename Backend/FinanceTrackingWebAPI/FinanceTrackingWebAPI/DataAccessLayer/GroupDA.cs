using FinanceTrackingWebAPI.Data;
using FinanceTrackingWebAPI.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceTrackingWebAPI.DataAccessLayer
{
    public interface IGroupDA
    {
        IEnumerable<Groups> Groups();
        Task<Groups> Groups(Groups obj);
        Task<Groups> Group(int id);
        Task<Groups> Groups(Groups obj, int id);
        Task<Groups> Delete(int id);
    }
    public class GroupDA : IGroupDA
    {
        private readonly ApplicationDbContext _context;
        public GroupDA(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Groups> Delete(int id)
        {
            var result = await _context.Groups.FirstOrDefaultAsync(a => a.Id == id);
            if (result != null)
            {
                _context.Groups.Remove(result);
                _context.SaveChanges();
                return result;
            }
            return null;
        }

        public Task<Groups> Group(int id)
        {
            return _context.Groups.FirstOrDefaultAsync(a => a.Id == id);
        }

        public IEnumerable<Groups> Groups()
        {
            return _context.Groups.ToList();
        }

        public async Task<Groups> Groups(Groups obj)
        {
            var result = await _context.Groups.AddAsync(obj);
            _context.SaveChanges();
            return result.Entity;
        }

        public async Task<Groups> Groups(Groups obj, int id)
        {
            var update = await _context.Groups.FirstOrDefaultAsync(a => a.Id == id);
            if (update != null)
            {
                update.GroupName = obj.GroupName;
                update.UserId = obj.UserId;
                _context.SaveChanges();
                return update;
            }
            return obj;
        }
    }
}
