using FinanceTrackingWebAPI.Authentication;
using FinanceTrackingWebAPI.DataAccessLayer;
using FinanceTrackingWebAPI.Entities;
using FinanceTrackingWebAPI.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceTrackingWebAPI.Services
{
    public interface IFriendsService
    {
        IEnumerable<Friend> friends(string userId);
        Task<int> Friend(Friend friends);
        bool Delete(string friendUserId);

    }
    public class FriendService : IFriendsService
    {
        private readonly IFriendsDA _friendsDA;
        public FriendService(IFriendsDA friendsDA)
        {
            _friendsDA = friendsDA;
        }

        public bool Delete(string friendUserId)
        {
            return _friendsDA.delete(friendUserId);
        }

        public async Task<int> Friend(Friend friends)
        {
            foreach (var friendUserId in friends.FriendUserId)
            {
                var friendsModel = new Friends
                {
                    UserId = friends.UserId,
                    FriendUserId = friendUserId,
                };
                await _friendsDA.friend(friendsModel);
                var friendsModelForFriend = new Friends
                {
                    UserId = friendUserId,
                    FriendUserId = friends.UserId
                };
                await _friendsDA.friend(friendsModelForFriend);
            }
            return friends.FriendId;
        }

        public IEnumerable<Friend> friends(string userId)
        {
            var result = _friendsDA.friends(userId).GroupBy(i => i.UserId);
            if (result != null)
            {
                return (from exp in result
                        select new Friend
                        {
                            UserId = exp.Key,
                            //FriendUserId = exp.Select(x=>x.FriendUserId).ToList(),
                            //FriendUserName = exp.Select(x=>x.applicationUser.UserName).ToString(),
                            FriendUserId = exp.Select(x=>x.applicationUser.UserName).ToList()
                        });
            }
            return null;
        }
    }
}
