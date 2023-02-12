from rest_framework import permissions
# only owner user have permission
class OnlyOwner(permissions.BasePermission):

    def has_permission(self, request, view):

        if request.user.username == request.data['name']:
            return True
        return False
# class BlacklistPermission(permissions.BasePermission):
#     """
#     Global permission check for blacklisted IPs.
#     """

#     def has_permission(self, request, view):
#         ip_addr = request.META['REMOTE_ADDR']
#         blacklisted = Blacklist.objects.filter(ip_addr=ip_addr).exists()
#         return not blacklistedrequest.user.username

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    Assumes the model instance has an `owner` attribute.
    """

class PermOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):

        return obj.username == request.user.username