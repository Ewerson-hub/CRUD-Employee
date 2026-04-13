module.exports = {
    ifeq: function(a, b){
        return (a==b)? 'checked': ""
    },
    check: function(role){
        return !role
    }
}