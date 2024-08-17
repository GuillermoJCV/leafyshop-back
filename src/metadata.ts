/* eslint-disable */
export default async () => {
    const t = {
        ["./countries/cities/districts/dto/create-district.dto"]: await import("./countries/cities/districts/dto/create-district.dto"),
        ["./countries/cities/dto/create-city.dto"]: await import("./countries/cities/dto/create-city.dto")
    };
    return { "@nestjs/swagger": { "models": [[import("./countries/cities/districts/dto/create-district.dto"), { "CreateDistrictDto": { name: { required: true, type: () => String }, city_id: { required: true, type: () => Number } } }], [import("./countries/cities/dto/create-city.dto"), { "CreateCityDto": { name: { required: true, type: () => String }, prefix: { required: true, type: () => String }, districtsDto: { required: false, type: () => [t["./countries/cities/districts/dto/create-district.dto"].CreateDistrictDto] }, country_id: { required: true, type: () => Number } } }], [import("./countries/dto/create-country.dto"), { "CreateCountryDto": { name: { required: true, type: () => String }, currency: { required: true, type: () => String }, citiesDto: { required: false, type: () => [t["./countries/cities/dto/create-city.dto"].CreateCityDto] } } }], [import("./countries/dto/update-country.dto"), { "UpdateCountryDto": {} }], [import("./countries/cities/dto/update-city.dto"), { "UpdateCityDto": {} }], [import("./countries/cities/districts/dto/update-district.dto"), { "UpdateDistrictDto": {} }], [import("./categories/dto/create-category.dto"), { "CreateCategoryDto": { name: { required: true, type: () => String } } }], [import("./categories/dto/update-category.dto"), { "UpdateCategoryDto": {} }], [import("./categories/entities/category.entity"), { "Category": {} }], [import("./countries/cities/entities/city.entity"), { "City": {} }], [import("./countries/cities/districts/entities/district.entity"), { "District": {} }]], "controllers": [[import("./countries/countries.controller"), { "CountriesController": { "createCountry": {}, "getCountries": {}, "getCountryById": {}, "updateCountry": {}, "deleteCountry": {} } }], [import("./countries/cities/cities.controller"), { "CitiesController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./countries/cities/districts/districts.controller"), { "DistrictsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./categories/categories.controller"), { "CategoriesController": { "create": { type: String }, "findAll": { type: String }, "findOne": { type: String }, "update": { type: String }, "remove": { type: String } } }], [import("./users/auth/auth.controller"), { "AuthController": { "signup": {}, "login": {} } }]] } };
};