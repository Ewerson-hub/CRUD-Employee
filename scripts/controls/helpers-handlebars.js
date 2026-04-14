module.exports = {
    ifeq: function(a, b){
        console.log(a, ' e ', b)
        return (a==b)? true: false;
    },
    not: function(role){
        return !role
    },
    formatRole: function(role){
        return (Boolean(role))? "Admin":"User"
    }

}