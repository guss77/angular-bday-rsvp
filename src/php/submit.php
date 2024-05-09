<?php

require __DIR__ . '/vendor/autoload.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

switch ($_SERVER['REQUEST_METHOD']) {
case 'OPTIONS':
	echo "OK";
	exit;
case 'POST':
	if ($_SERVER["CONTENT_TYPE"] == 'application/json')
		foreach (json_decode(file_get_contents('php://input'), true) as $key => $val) {
			$_REQUEST[$key] = $val;
		}
}

// configure the Google Client
$client = new \Google_Client();
$client->setApplicationName('Google Sheets API');
$client->setScopes([\Google_Service_Sheets::SPREADSHEETS]);
$client->setAccessType('offline');
// credentials.json is the key file we downloaded while setting up our Google Sheets API
$client->setAuthConfig('../daniel-bday-685fcc210bc6.json');

// configure the Sheets Service
$service = new \Google_Service_Sheets($client);
$spreadsheetId = '16fxQHA6Gp4qzoVQeti-_hT5mY8IH0-upmd3g9qqiAQo';
$spreadsheet = $service->spreadsheets->get($spreadsheetId);
//var_dump($spreadsheet);

if (@$_REQUEST['name'] and @$_REQUEST['count']) {
	try {
		$newRow = [ $_REQUEST['name'], $_REQUEST['count'] ];
		$rows = [$newRow]; // you can append several rows at once
		$valueRange = new \Google_Service_Sheets_ValueRange();
		$valueRange->setValues($rows);
		$range = 'אישור הזמנה'; // the service will detect the last row of this sheet
		$options = ['valueInputOption' => 'USER_ENTERED'];
		$service->spreadsheets_values->append($spreadsheetId, $range, $valueRange, $options);
		echo json_encode(['status' => true]);
	} catch (Exception $e) {
		echo json_encode(['status' => false, 'error' => $e->getMessage()]);
	}
} else {
	echo json_encode(['status' => false]);
}
