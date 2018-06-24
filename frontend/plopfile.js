module.exports = function(plop) {
	// controller generator
	plop.setGenerator("controller", {
		description: "React component generator",
		prompts: [
			{
				type: "input",
				name: "componentName",
				message: "component name please"
			},
			{
				type: "input",
				name: "path",
				message: "absolute path please"
			}
		],
		actions: [
			{
				type: "add",
				path: "{{path}}/{{componentName}}/{{componentName}}.js",
				templateFile: "templates/BasicComponent/BasicComponent.hbs"
			},
			{
				type: "add",
				path:
					"{{path}}/{{componentName}}/{{lowerCase componentName}}.scss",
				templateFile: "templates/BasicComponent/BasicComponent.scss"
			},
			{
				type: "add",
				path:
					"{{path}}/{{componentName}}/index.js",
				templateFile: "templates/export.hbs"
			}
		]
	});
};
