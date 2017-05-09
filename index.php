<!doctype html>
<html>

<head>
	<title>URL Query String Tabler</title>
	<meta name="description" content="Paste a list of URLs and get a table of query string parameters to compare! Wow!"/>
	<link rel="shortcut icon" href="../../favicon.ico" />
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	
	<link rel="stylesheet" type="text/css" href="style.css?v=0"/>
	<script type="text/javascript" src="code.js?v=0"></script>

	<!-- Google Tag Manager -->
	<script>
	dataLayer = [{
		"pageType":"app"
	}];

	(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
	new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
	j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
	'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
	})(window,document,'script','dataLayer','GTM-TWPWXN5');</script>
	<!-- End Google Tag Manager -->
</head>

<body>
	<div id="frame_main">
		<div id="title">Query String Tabler</div>
		<div id="frame_input">
			<p>Paste a list of URLs below, one per line.</p>
			<p>Note that in Chrome, horizontal scrolling on long URLS is slow as hell. Why is Chrome slow as hell? Come on, man.</p>
			<textarea id="input_urls" wrap="off">Gimme dat URL</textarea>
			<div class="row"><div class="button row_item" id="button_calculate">Table it up</div><div class="row_item"><input id="input_hidesame" type="checkbox"/> Hide parameters that are the same among all (>1) URLS</div></div>
		</div>
	</div>
	<div id="frame_output"></div>
</body>

</html>