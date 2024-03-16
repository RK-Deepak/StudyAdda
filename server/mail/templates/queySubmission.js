const querySubmittedTemplate = () => {
	return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>Query Submitted Email</title>
		<style>
			body {
				background-color: #ffffff;
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.4;
				color: #333333;
				margin: 0;
				padding: 0;
			}
	
			.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 20px;
				text-align: center;
			}
	
			.logo {
				max-width: 200px;
				margin-bottom: 20px;
			}
	
			.message {
				font-size: 18px;
				font-weight: bold;
				margin-bottom: 20px;
			}
	
			.body {
				font-size: 16px;
				margin-bottom: 20px;
			}
	
			.support {
				font-size: 14px;
				color: #999999;
				margin-top: 20px;
			}
		</style>
	
	</head>
	
	<body>
		<div class="container">
			<a href="https://studynotion-edtech-project.vercel.app"><img class="logo"
					src="https://i.ibb.co/7Xyj3PC/logo.png" alt="Your Company Logo"></a>
			<div class="message">Query Submitted Confirmation</div>
			<div class="body">
				<p>Dear buddy</p>
				<p>Your query has been successfully submitted. Our team will review it and get back to you within 24-48
					hours.</p>
				<p>Thank you for reaching out to us. We appreciate your patience.</p>
			</div>
			<div class="support">If you have any urgent concerns or additional questions, please feel free to reach out
				to us at <a href="mailto:info@yourcompany.com">info@yourcompany.com</a>.</div>
		</div>
	</body>
	
	</html>`;
};

module.exports = querySubmittedTemplate;
