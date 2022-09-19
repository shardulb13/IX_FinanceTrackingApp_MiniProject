using FinanceTrackingWebAPI.DataAccessLayer;
using FinanceTrackingWebAPI.Entities;
using FinanceTrackingWebAPI.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceTrackingWebAPI.Services
{
    public interface IGroupService
    {
        IEnumerable<GroupDTO> Groups(string userId);
        Task<int> Group(GroupDTO groups);
        Task<GroupDTO> Group(int id);
        Task<int> UpdateGroup(GroupDTO groups);
        bool Delete(int id);
    }
    public class GroupService : IGroupService
    {
        private readonly IGroupDA _groupDA;
        public GroupService(IGroupDA groupService)
        {
            _groupDA = groupService;
        }

        public bool Delete(int id)
        {
            var deleteData = _groupDA.Delete(id);
            if (deleteData)
            {
                return true;
            }
            return false;
        }

        public async Task<GroupDTO> Group(int id)
        {
            var result = await _groupDA.Group(id);
            if (result != null)
            {
                return new GroupDTO
                {
                    Id = result.Id,
                    GroupName = result.GroupName,
                    //UserId = result.UserId
                };
            }
            return null;
        }

        public IEnumerable<GroupDTO> Groups(string userId)
        {
            var result = _groupDA.Groups(userId);
            if (result != null)
            {
                return (from grp in result
                        select new GroupDTO
                        {
                            Id = grp.groupId,
                            GroupName = grp.groupName,
                            UserId = grp.userIds
                        }).ToList();
            }
            return null;
        }

        public async Task<int> Group(GroupDTO groupModel)
        {
            var group = new Groups
            {
                GroupName = groupModel.GroupName,
                CreatedBy = groupModel.Id,
                CreatedOn = DateTime.Now,
                IsActive = groupModel.IsActive,
            };
            var addGroup = await _groupDA.Group(group);
            foreach (var id in groupModel.UserId)
            {
                var usersGroup = new UsersGroup
                {
                    GroupId = group.Id,
                    UserId = id,
                };
                await _groupDA.Groups(usersGroup);
            }
            return group.Id;
        }

        public async Task<int> UpdateGroup(GroupDTO groupModel)
        {
            var group = new Groups
            {
                Id = groupModel.Id,
                GroupName = groupModel.GroupName,
                //UserId = obj.UserId
            };
            
            return await _groupDA.UpdateGroup(group);
        }
    }
}
