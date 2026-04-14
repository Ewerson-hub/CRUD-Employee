module.exports = {
    ifeq: function(a, b){
        return (a==b)? 'checked': ""
    },
    not: function(role){
        return !role
    },
    formatRole: function(role){
        return (Boolean(role))? "Admin":"User"
    }

}