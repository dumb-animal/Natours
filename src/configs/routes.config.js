module.exports = {
	any: "*",
	user: "/api/v1/user",
	userRoutes: {
		users: "/",
		user: "/:id",
		signup: "/signup",
		login: "/login",
		forgot: "/forgot-password",
		reset: "/reset-password/:token",
		updatePassword: "/update-password"
	},
	tour: "/api/v1/tour",
	tourRoutes: {
		tours: "/",
		tour: "/:id",
		stats: "/stats",
		topFive: "/top-five",
		monthlyPlan: "/monthly-plan/:year",
	},
};
