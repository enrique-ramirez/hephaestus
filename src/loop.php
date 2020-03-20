<?php defined( 'ABSPATH' ) || exit; ?>
BLA
<?php if (have_posts()): while (have_posts()) : the_post(); ?>
  <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

    <header>
      <?php if ( has_post_thumbnail() ) : ?>
        <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
          <?php the_post_thumbnail( [120, 120] ); ?>
        </a>
      <?php endif; ?>

      <h2>
        <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a>
      </h2>
    </header>

    <footer class="date">
      <time datetime="<?php the_time( 'Y-m-d' ); ?> <?php the_time( 'H:i' ); ?>">
        <?php the_date(); ?> <?php the_time(); ?>
      </time>

      <span class="author">
        <?php esc_html_e( 'Published by', 'hephaestus' ); ?> <?php the_author_posts_link(); ?>
      </span>

      <span class="comments">
        <?php if ( comments_open( get_the_ID() ) ) {
          comments_popup_link(
            __( 'Leave your thoughts', 'hephaestus' ),
            __( '1 Comment', 'hephaestus' ),
            __( '% Comments', 'hephaestus' ),
          );
        } ?>
      </span>
    </footer>

    <?php the_excerpt(); ?>

    <?php edit_post_link(); ?>
  </article>
<?php endwhile; endif; ?>
