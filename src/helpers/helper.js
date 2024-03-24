const Handlebars = require('handlebars')

module.exports = {
    sum: (a,b) =>a+b,
    sortable: function(name, sort){
        const sortType = name === sort.column ? sort.type : 'default'
        const icons = {
            default: 'fa fa-sort',
            asc: 'fa fa-sort-alpha-asc',
            desc: 'fa fa-sort-alpha-desc',
        }
        const types = {
            default: 'desc',
            asc: 'desc',
            desc: 'asc',
        }
        const icon = icons[sortType]
        const type = types[sortType]

        const href = Handlebars.escapeExpression(`?_sort&column=${name}&type=${type}`)
        const result =  `<a href="${href}">
            <i class="${icon}" aria-hidden="true"></i>
        </a>`
        return new Handlebars.SafeString(result);
    }
}