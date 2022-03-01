module.exports = {
	internalError: { statusCode: 500, message: "Внутренняя ошибка" },
	routeNotFound: { statusCode: 404, message: "Такого маршрута не существует" },
	PageNotExist: { statusCode: 400, message: "такой страницы не существует" },
	tourNotFound: { statusCode: 404, message: "Такой тур не найден" },
	invalidData: { statusCode: 400, message: "Переданы неверные поля" },
	incorrectData: { statusCode: 404, message: "Неверный логин или пароль" },
	tokenNotProvided: { statusCode: 401, message: "Токен не предоставлен" },
	invalidToken: {
		invalidToken: 401,
		message: "Передан недействительный токен",
	},
	userNotExist: {
		statusCode: 400,
		message: "Такого пользователя не существует",
	},
};
