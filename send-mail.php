<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

require 'vendor/autoload.php';

$projectRoot = dirname(__DIR__, 1);

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Retrive env variable
$userName = $_ENV['MAIL_USERNAME'];
$password = $_ENV['MAIL_PASSWORD'];
$recaptchaSecret = $_ENV['SECERE_KEY'];
// echo $password;
// echo $userName;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Verify reCAPTCHA
    $recaptchaResponse = $_POST['g-recaptcha-response'];
    $recaptchaUrl = 'https://www.google.com/recaptcha/api/siteverify';
    $response = file_get_contents($recaptchaUrl . '?secret=' . $recaptchaSecret . '&response=' . $recaptchaResponse);
    $responseKeys = json_decode($response, true);

    if (intval($responseKeys["success"]) !== 1) {
        echo "Please complete the reCAPTCHA verification.";
        exit;
    }

    // Determine which form was submitted
    $isBottomForm = isset($_POST['full_name_2']);

    // Retrieve and sanitize form data based on the submitted form
    if ($isBottomForm) {
        $fullName = htmlspecialchars($_POST['full_name_2'] ?? '');
        $workEmail = filter_var($_POST['work_email_2'] ?? '', FILTER_SANITIZE_EMAIL);
        $mobilePhone = htmlspecialchars($_POST['mobile_phone_2'] ?? '');
        $moveInDate = htmlspecialchars($_POST['move_in_date_2'] ?? '');
        $numberOfPeople = htmlspecialchars($_POST['number_of_people_2'] ?? '');
        $company = htmlspecialchars($_POST['company_2'] ?? '');
        $additionalInfo = htmlspecialchars($_POST['additional_info_2'] ?? '');
        $selectedPlan = htmlspecialchars($_POST['select_plan_2'] ?? '');
    } else {
        // Handle top form submission
        $fullName = htmlspecialchars($_POST['full_name'] ?? '');
        $workEmail = filter_var($_POST['work_email'] ?? '', FILTER_SANITIZE_EMAIL);
        $mobilePhone = htmlspecialchars($_POST['mobile_phone'] ?? '');
        $moveInDate = htmlspecialchars($_POST['move_in_date'] ?? '');
        $numberOfPeople = htmlspecialchars($_POST['number_of_people'] ?? '');
        $company = htmlspecialchars($_POST['company'] ?? '');
        $additionalInfo = htmlspecialchars($_POST['additional_info'] ?? '');
        $selectedPlan = htmlspecialchars($_POST['select_plan'] ?? '');
    }

    // Common plan names
    $planNames = [
        'opt-1' => 'Dedicated Desk',
        'opt-2' => 'Private Cabins',
        'opt-3' => 'Meeting Rooms',
        'opt-4' => 'Conference Room',
        'opt-5' => 'Training Room',
        'opt-6' => 'Mini Cabin',
    ];

    // Get the readable name for the selected plan
    $selectedPlanName = $planNames[$selectedPlan] ?? 'Not specified';

    // Mail setup
    $mail = new PHPMailer(true);
    $mail->SMTPDebug = 0;

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.hostinger.com';
        $mail->SMTPAuth = true;
        $mail->Username = $userName;
        $mail->Password = $password;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;

        $mail->setFrom('vinaykumar@nextgeninfratech.in', 'Vinay Kumar');
        $mail->addAddress('vinaykumar@nextgeninfratech.in');

        $mail->isHTML(true);
        $mail->Subject = 'New - ' . ($isBottomForm ? ' Co-Working Space' : ' Co-Working Space');
        $mail->Body = "
        <html>
        <body style='font-family: Arial, sans-serif; color: #333;'>
            <div style='width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;'>
                <h2 style='text-align: center;'>New Enquiry Form Submission</h2>
                <p><strong>Full Name:</strong> $fullName</p>
                <p><strong>Work Email:</strong> $workEmail</p>
                <p><strong>Mobile Phone:</strong> $mobilePhone</p>
                <p><strong>Move In Date:</strong> $moveInDate</p>
                <p><strong>Number of People:</strong> $numberOfPeople</p>
                <p><strong>Company:</strong> $company</p>
                <p><strong>Additional Info:</strong> $additionalInfo</p>
                <p><strong>Selected Plan:</strong> $selectedPlanName</p>
            </div>
        </body>
        </html>
        ";

        $mail->AltBody = "
        New Enquiry Form Submission

        Full Name: $fullName
        Work Email: $workEmail
        Mobile Phone: $mobilePhone
        Move In Date: $moveInDate
        Number of People: $numberOfPeople
        Company: $company
        Additional Info: $additionalInfo
        Selected Plan: $selectedPlanName
        ";

        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    echo "Form not submitted properly.";
}
