<?php defined( 'ABSPATH' ) || exit; ?>

<?php get_header(); ?>

<main role="main" class="mastcontent">
  <div class="container">
    <h1><?php esc_html_e( 'Latest Posts', 'hephaestus' ); ?></h1>
    <?php get_template_part( 'loop' ); ?>
  </div>
</main>

<?php get_footer(); ?>
