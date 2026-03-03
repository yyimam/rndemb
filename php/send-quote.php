<?php

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
    exit;
}

$name = trim($_POST["name"] ?? "");
$email = trim($_POST["email"] ?? "");
$mobile = trim($_POST["mobile"] ?? "");
$message = trim($_POST["message"] ?? "");

// Validation
if (empty($name) || empty($email)) {
    echo json_encode(["status" => "error", "message" => "Required fields missing"]);
    exit;
}

// Email settings
$adminEmail = "admin@yourdomain.com"; // Change this
$subject = "New Quote Request from " . $name;

// Email body
$body = "
You received a new quote request:

Name: $name
Email: $email
Mobile: $mobile

Message:
$message
";

// File upload handling
$uploadDir = "uploads/";
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$attachments = [];

for ($i = 1; $i <= 3; $i++) {
    if (!empty($_FILES["file_$i"]["name"])) {

        $fileName = time() . "_" . basename($_FILES["file_$i"]["name"]);
        $targetPath = $uploadDir . $fileName;

        if (move_uploaded_file($_FILES["file_$i"]["tmp_name"], $targetPath)) {
            $attachments[] = $targetPath;
        }
    }
}

// Simple mail (without attachment support)
$headers = "From: $email";

$mailSent = mail($adminEmail, $subject, $body, $headers);

if ($mailSent) {

    // Send confirmation to user
    $userSubject = "We Received Your Quote Request";
    $userMessage = "Hi $name,\n\nThank you for contacting us. We will get back to you shortly.\n\nRegards,\nCompany Team";

    mail($email, $userSubject, $userMessage, "From: $adminEmail");

    echo json_encode([
        "status" => "success",
        "message" => "Your quote request has been submitted successfully!"
    ]);

} else {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to send email. Please try again."
    ]);
}
