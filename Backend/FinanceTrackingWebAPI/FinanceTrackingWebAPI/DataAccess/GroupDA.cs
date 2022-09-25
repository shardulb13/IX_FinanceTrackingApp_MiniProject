using FinanceTrackingWebAPI.Data;
using FinanceTrackingWebAPI.Entities;
using FinanceTrackingWebAPI.Model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceTrackingWebAPI.DataAccessLayer
{
    public interface IGroupDA
    {
        IEnumerable<UsersGroupDTO> Groups(string userId);
        Task<int> Group(Group groups);
        Task<int> Groups(UsersGroup usersGroup);
        Task<Group> Group(int id);
        Task<int> UpdateGroup(Group groups);
        bool Delete(int id);
    }
    public class GroupDA : IGroupDA
    {
        private readonly ApplicationDbContext _context;
        public GroupDA(ApplicationDbContext context)
        {
            _context = context;
        }
        public bool Delete(int id)
        {
            var result = _context.Groups.FirstOrDefault(a => a.Id == id);
            if (result != null)
            {
                _context.Groups.Remove(result);
                _context.SaveChanges();
                return true;
            }
            return false;
        }

        public Task<Group> Group(int id)
        {
            return _context.Groups.FirstOrDefaultAsync(a => a.Id == id);
            
        }

        public IEnumerable<UsersGroupDTO> Groups(string userId)
        {
            return  _context.Groups.Select(o => new UsersGroupDTO
            {
                groupId = o.Id,
                groupName = o.GroupName,
                userIds = o.usersGroup.Select(un => un.ApplicationUser.UserName).ToList()

            }).Where(a => a.userIds.Contains(userId)).ToList();
        }

        public async Task<int> Group(Group groups)
        {
            await _context.Groups.AddAsync(groups);
            await _context.SaveChangesAsync();
            return groups.Id;
        }
        public async Task<int> Groups(UsersGroup usersgroup)
        {
             await _context.UsersGroup.AddAsync(usersgroup);
             await _context.SaveChangesAsync();
            return usersgroup.Id;
        }

        public async Task<int> UpdateGroup(Group groups)
        {
            var updateGroup =  _context.Groups.FirstOrDefault(a => a.Id == groups.Id);
            if (updateGroup != null)
            {
               updateGroup.GroupName = groups.GroupName;
               await _context.SaveChangesAsync();
               return updateGroup.Id;
            }
            return 0;
        }
    }
}
