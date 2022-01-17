-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 04, 2021 at 10:41 AM
-- Server version: 5.7.26
-- PHP Version: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `general_accountant`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
CREATE TABLE IF NOT EXISTS `account` (
  `account_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` int(11) NOT NULL,
  `parent_account_id` bigint(20) NOT NULL,
  `foundation_id` int(11) NOT NULL,
  `child_number` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`account_id`),
  KEY `account_parent_account_id_foreign` (`parent_account_id`),
  KEY `account_foundation_id_foreign` (`foundation_id`)
) ENGINE=MyISAM AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`account_id`, `name`, `description`, `level`, `parent_account_id`, `foundation_id`, `child_number`, `created_at`, `updated_at`) VALUES
(1, 'الموجودات', 'يمثل كل ما تمتلكه المنشأة من موارد اقتصادية و موجودات لديها', 0, 0, 0, 1, NULL, NULL),
(2, 'المطاليب', 'يمثل الألتزامات و الديون المترتبة على المنشأة نتيجة ممارسة نشاطها التجاري', 0, 0, 0, 2, NULL, NULL),
(3, 'ص. المشتريات', 'يمثل المشتريات الإجمالية بعد إضافة أجور الشحن و طرح المردودات من هذه المشتريات و المسموحات الممنوحة عنها و بعد طرح الخصم النقدي المكتسب من قيمتها  ', 0, 0, 0, 3, NULL, NULL),
(4, 'ص. المبيعات', 'يمثل المبيعات الإجمالية بعد طرح المبيعات المردودة و المسموحات الممنوحة على المبيعات و بعد طرح الخصم النقدي الممنوح على قيمتها ', 0, 0, 0, 4, NULL, NULL),
(5, 'المصاريف', ' يمثل الأعباء التى تتكبدها المنشأه فى سبيل تحقيق الايراد', 0, 0, 0, 5, NULL, NULL),
(6, 'الإيرادات', 'يمثل الدخل التي تحققه المنشأة من خلال نشاطها الاقتصادي، ومما ينتج عن زيادة في أصول الشركة أو إنخفاض في إلتزاماتها', 0, 0, 0, 6, NULL, NULL),
(7, 'البضاعة', 'يمثل قيمة و محتوى البضاعة المخزنة لدى المنشأة', 0, 0, 0, 7, NULL, NULL),
(8, 'الميزانية', '....', 0, 0, 0, 8, NULL, NULL),
(9, 'الموجودات الثابتة', 'يمثل كل ما تقتنيه المنشأة بغرض استخدامه في العملية الإنتاجية وليس بغرض البيع ', 1, 1, 0, 1, NULL, NULL),
(10, 'الموجودات المتداولة', '', 1, 1, 0, 2, NULL, '2021-08-06 15:01:35'),
(11, 'الأموال الجاهزة', 'يمثل النقدية الموجودة لدى المنشأة ', 1, 1, 0, 3, NULL, NULL),
(12, 'المطاليب الثابتة', 'يمثل رأس المال و القروض', 1, 2, 0, 1, NULL, NULL),
(13, 'المطاليب المتداولة', 'يمثل التزامات المترتبة على الشركة', 1, 2, 0, 2, NULL, NULL),
(14, 'المشتريات', 'يمثل مشتريات المنشأة ', 1, 3, 0, 1, NULL, NULL),
(15, 'مرتجع المشتريات', 'يمثل المشتريات التي تم ردها و استرداد ثمنها', 1, 3, 0, 2, NULL, NULL),
(16, 'مصاريف نقل المشتريات', 'يمثل مصاريف نقل المشتريات', 1, 3, 0, 3, NULL, NULL),
(17, 'الحسم المكتسب', 'يمثل الخصومات التي حصلت عليها المنشأة عند الشراء والسداد', 1, 3, 0, 4, NULL, NULL),
(18, 'المبيعات', 'يمثل مبيعات المنشأة', 1, 4, 0, 1, NULL, NULL),
(19, 'مرتجع المبيعات', 'يمثل المبيعات التي تم ردها و ترجيع ثمنها', 1, 4, 0, 2, NULL, NULL),
(20, 'الحسم الممنوح', 'يمثل الخصومات التي منحتها المنشأة عند السداد في وقت محدد', 1, 4, 0, 3, NULL, NULL),
(21, 'رواتب و أجور ', 'يمثل مصاريف الرواتب و الأجور', 1, 5, 0, 1, NULL, NULL),
(22, 'ماء و كهرباء', 'يمثل مصاريف الماء و الكهرباء', 1, 5, 0, 2, NULL, NULL),
(23, 'مصاريف متفرقة', 'يمثل مصاريف متفرقة', 1, 5, 0, 3, NULL, NULL),
(24, 'الإيرادات المختلفة', 'يمثل الإيردات المختلفة في المنشأة', 1, 6, 0, 1, NULL, NULL),
(25, 'البضاعة أول المدة', 'يمثل البضاعة الموجودة لدى المنشأة في بداية الفترة المحاسبية', 1, 7, 0, 1, NULL, NULL),
(26, 'البضاعة آخر المدة', 'يمثل البضاعة الموجودة لدى المنشأة في نهاية الفترة المحاسبية', 1, 7, 0, 2, NULL, NULL),
(27, 'الأرباح و الخسائر', 'يمثل الأرباح و الخسائر لدى المنشأة ', 1, 8, 0, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `document`
--

DROP TABLE IF EXISTS `document`;
CREATE TABLE IF NOT EXISTS `document` (
  `document_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `foundation_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`document_id`),
  KEY `document_foundation_id_foreign` (`foundation_id`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `entry_account`
--

DROP TABLE IF EXISTS `entry_account`;
CREATE TABLE IF NOT EXISTS `entry_account` (
  `entry_account_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `amount` decimal(10,4) NOT NULL,
  `type` int(1) NOT NULL,
  `account_id` bigint(20) NOT NULL,
  `date` date NOT NULL,
  `description` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `document_id` bigint(20) NOT NULL,
  `ledger_account_id` bigint(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`entry_account_id`),
  KEY `entry_account_account_id_foreign` (`account_id`),
  KEY `entry_account_document_id_foreign` (`document_id`),
  KEY `entry_account_ledger_account_id_foreign` (`ledger_account_id`)
) ENGINE=MyISAM AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `foundation`
--

DROP TABLE IF EXISTS `foundation`;
CREATE TABLE IF NOT EXISTS `foundation` (
  `foundation_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `foundation_type_id` int(11) NOT NULL,
  `country` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `currency` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`foundation_id`),
  KEY `foundation_foundation_type_id_foreign` (`foundation_type_id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `foundation_type`
--

DROP TABLE IF EXISTS `foundation_type`;
CREATE TABLE IF NOT EXISTS `foundation_type` (
  `foundation_type_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`foundation_type_id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `foundation_type`
--

INSERT INTO `foundation_type` (`foundation_type_id`, `title`, `created_at`, `updated_at`) VALUES
(1, 'خدمات إبداعية  , فن و تصوير', NULL, NULL),
(2, 'خدمات مالية و تأمين', NULL, NULL),
(3, 'بناء و ديكور', NULL, NULL),
(4, 'خدمات استشارية و مهنية', NULL, NULL),
(5, 'طب, اسنان و صحة', NULL, NULL),
(6, 'عقارات', NULL, NULL),
(7, 'ويب , تقنية و وسائط متعددة', NULL, NULL),
(8, 'بيع بالتجزئة و الجملة', NULL, NULL),
(9, 'منظمات غير ربحية  , جمعيات و مجموعات', NULL, NULL),
(10, 'غير ذلك : انا اقدم خدمة', NULL, NULL),
(11, 'غير ذلك : انا اصنع او ابيع منتج', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ledger_account`
--

DROP TABLE IF EXISTS `ledger_account`;
CREATE TABLE IF NOT EXISTS `ledger_account` (
  `ledger_account_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `account_id` bigint(20) NOT NULL,
  `balance` decimal(10,4) NOT NULL,
  `debit_balance` decimal(10,4) NOT NULL,
  `credit_balance` decimal(10,4) NOT NULL,
  `foundation_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`ledger_account_id`),
  KEY `ledger_account_account_id_foreign` (`account_id`),
  KEY `ledger_account_foundation_id_foreign` (`foundation_id`)
) ENGINE=MyISAM AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_user_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2016_06_01_000001_create_oauth_auth_codes_table', 1),
(4, '2016_06_01_000002_create_oauth_access_tokens_table', 1),
(5, '2016_06_01_000003_create_oauth_refresh_tokens_table', 1),
(6, '2016_06_01_000004_create_oauth_clients_table', 1),
(7, '2016_06_01_000005_create_oauth_personal_access_clients_table', 1),
(8, '2019_08_19_000000_create_failed_jobs_table', 1),
(9, '2021_05_03_143743_create_foundation_table', 1),
(10, '2021_05_03_143928_create_foundation_type_table', 1),
(11, '2021_05_03_144027_create_account_table', 1),
(12, '2021_05_03_144115_create_document_table', 1),
(13, '2021_05_03_144347_create_entry_account_table', 1),
(14, '2021_05_03_144436_create_ledger_account_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `oauth_access_tokens`
--

DROP TABLE IF EXISTS `oauth_access_tokens`;
CREATE TABLE IF NOT EXISTS `oauth_access_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_access_tokens_user_id_index` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_auth_codes`
--

DROP TABLE IF EXISTS `oauth_auth_codes`;
CREATE TABLE IF NOT EXISTS `oauth_auth_codes` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_auth_codes_user_id_index` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_clients`
--

DROP TABLE IF EXISTS `oauth_clients`;
CREATE TABLE IF NOT EXISTS `oauth_clients` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redirect` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_clients_user_id_index` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_clients`
--

INSERT INTO `oauth_clients` (`id`, `user_id`, `name`, `secret`, `provider`, `redirect`, `personal_access_client`, `password_client`, `revoked`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Laravel Personal Access Client', '55VO7qvaPTmNpYVHvV4pfx3je20hkOk2jkinpLxU', NULL, 'http://localhost', 1, 0, 0, '2021-06-08 09:35:17', '2021-06-08 09:35:17'),
(2, NULL, 'Laravel Password Grant Client', 'Ighd3bdmeQO0QKqkAeFbdc9RD1Y0MmR5P18EI9CM', 'users', 'http://localhost', 0, 1, 0, '2021-06-08 09:35:17', '2021-06-08 09:35:17');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_personal_access_clients`
--

DROP TABLE IF EXISTS `oauth_personal_access_clients`;
CREATE TABLE IF NOT EXISTS `oauth_personal_access_clients` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_personal_access_clients`
--

INSERT INTO `oauth_personal_access_clients` (`id`, `client_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2021-06-08 09:35:17', '2021-06-08 09:35:17');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_refresh_tokens`
--

DROP TABLE IF EXISTS `oauth_refresh_tokens`;
CREATE TABLE IF NOT EXISTS `oauth_refresh_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` tinyint(1) NOT NULL,
  `foundation_id` int(11) DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_email_unique` (`email`),
  KEY `user_foundation_id_foreign` (`foundation_id`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
