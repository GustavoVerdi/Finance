<?php
// Configuração da conexão MySQLi
$servername = '127.0.0.1'; // Endereço do servidor MySQL
$username = 'root'; // Nome de usuário do MySQL
$password = '';   // Senha do MySQL (se aplicável)
$dbname = 'marcosbanco'; // Nome do banco de dados

// Verifica se a conexão com o banco de dados foi estabelecida com sucesso
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Conexão com o banco de dados falhou: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtenha os valores do formulário de login
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    // Consulta para verificar as credenciais usando instruções preparadas
    $sql = "SELECT senha FROM usuarios WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->bind_result($senha_md5);
    $stmt->fetch();

    // Verifique se a senha fornecida pelo usuário é igual à senha MD5 no banco de dados
    if (md5($senha) == $senha_md5) {
        // Senha válida, usuário autenticado com sucesso
        session_start();
        $_SESSION['user_id'] = $email; // Defina a sessão para autenticar o usuário

        header("Location: index2.php"); // Redireciona para a página de dashboard após o login
        exit();
    } else {
        // Credenciais inválidas, exiba uma mensagem em JavaScript
        echo "<script language='javascript' type='text/javascript'>
            alert('E-mail ou senha inválida');
            window.location.href='login.html?erro=1';</script>";
        exit();
    }
}
?>
