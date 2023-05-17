"use strict";

// Handle mobile hamburger toggle.
document.querySelector( "#menu-toggle" ).addEventListener( "click", function(e) {
	document.body.classList.toggle( "mobile-menu-opened" );
	e.preventDefault();
	return false;
});

document.querySelectorAll( ".main-navigation .menu-item-has-children > a" ).forEach( function( menu_link ) {
	menu_link.addEventListener( "click", function(e) {
		// check if we are in mobile view (if mobile hamburger toggle is visible)
		if ( null !== document.querySelector( "#menu-toggle" ).offsetParent ) {
			// Handle sub-menus visibility for mobile view
			var parent = e.target.parentElement;
			if ( ! parent.classList.contains( "menu-item-has-children" ) ) {
				parent = parent.parentElement;
			}
			parent.classList.toggle( "collapse" );
			e.preventDefault();
			return false;
		} else {
			if ( window.matchMedia( "(any-hover: none)" ).matches ) {
				// prevent click events on touch based devices
				e.preventDefault();
				return false;
			}
		}
	});
});
// By default, collapse current sub-menus for mobile view
document.querySelectorAll( ".main-navigation .current-menu-parent, .main-navigation .current-menu-ancestor" ).forEach( function( menu_item ) {
	menu_item.classList.add( "collapse" );
});

// Handle hover events for menu items
document.querySelectorAll( ".main-navigation li:not(.menu-item-scheme,.menu-item-search,.menu-item-cart)" ).forEach( function( menu_item ) {
	menu_item.addEventListener( "pointerenter", function(e) {
		if ( ! window.matchMedia( "(any-hover: none)" ).matches ) {
			e.target.classList.add( "hover" );
		}
	});
	menu_item.addEventListener( "pointerleave", function(e) {
		if ( ! window.matchMedia( "(any-hover: none)" ).matches ) {
			e.target.classList.remove( "hover" );
		}
	});
});

// Toggle visibility of dropdowns on keyboard focus events.
function menuItemBlurFocus( el, type ) {
	var closest_hover = el.closest( ".hover" );
	if ( null === closest_hover ) {
		document.querySelectorAll( ".main-navigation .menu-item-has-children.hover" ).forEach( function( el_hover ) {
			if ( el_hover !== closest_hover ) {
				el_hover.classList.remove( "hover" );
			}
		});
	}
	if ( el.classList.contains( "menu-item-has-children" ) ) {
		el.classList.add( "hover" );
	}
}
document.querySelectorAll( ".main-navigation li > a, .site-identity a, .main-navigation .menu-item-search input[type=search], .site-header .social-navigation a" ).forEach( function( item ) {
	item.addEventListener( "focus", function(e) {
		if ( null === document.querySelector( "#menu-toggle" ).offsetParent ) {
			menuItemBlurFocus( e.target.parentElement, "focus" );
			e.preventDefault();
		}
	});
	item.addEventListener( "blur", function(e) {
		if ( null === document.querySelector( "#menu-toggle" ).offsetParent ) {
			menuItemBlurFocus( e.target.parentElement, "blur" );
			e.preventDefault();
		}
	});
});

// Toggle visibility of dropdowns if touched outside the menu area.
document.addEventListener( "click", function(e) {
	if ( null === e.target.closest( ".main-navigation" ) ) {
		document.querySelectorAll( ".main-navigation .menu-item-has-children.hover" ).forEach( function( el_hover ) {
			el_hover.classList.remove( "hover" );
		});
	}
});

// Toggle color scheme (default or alt, see also detect-support.js).
document.querySelector( ".main-navigation .menu-item-scheme > a" ).addEventListener( "click", function(e) {
	var current_scheme = document.documentElement.getAttribute( "data-scheme" );
	if ( ! current_scheme || "default" === current_scheme ) {
		current_scheme = "alt";
	} else {
		current_scheme = "default";
	}
	document.documentElement.setAttribute( "data-scheme", current_scheme );
	localStorage.setItem( "colorSchemeBateria", current_scheme );

	e.preventDefault();
	return false;
});

// Toggle visibility of search form in primary menu.
document.querySelector( ".main-navigation .menu-item-search > a" ).addEventListener( "click", function(e) {
	document.body.classList.toggle( "searchform-opened" );
	if ( document.body.classList.contains( "searchform-opened" ) ) {
		window.setTimeout( function() {
			document.querySelector( ".main-navigation .searchform input[type=search]" ).focus();
		}, 150 );
	}
	e.preventDefault();
	return false;
});

// Hide search form if ESC character is pressed
document.querySelector( ".main-navigation .searchform input[type=search]" ).addEventListener( "keyup", function(e) {
	if ( 27 === e.keyCode ) {
		document.body.classList.remove( "searchform-opened" );
	}
});

// Handle quantity fields (custom -/+ buttons in a input[type=number])
document.querySelectorAll( ".quantity .quantity-change" ).forEach( function( quantityChange ) {
	quantityChange.addEventListener( "click", function(e) {
		var input    = e.target.parentElement.querySelector( "input[type=number]" );
		var max      = input.getAttribute( "max" );
		var min      = input.getAttribute( "min" );
		var oldValue = parseFloat( input.value );
		var newVal;
		if ( ! oldValue ) {
			oldValue = parseFloat( input.getAttribute( "placeholder" ) );
			if ( ! oldValue ) {
				oldValue = 0;
			}
		}

		if ( e.target.classList.contains( "decrease" ) ) {
			if ( ! min ) {
				min = 1;
			}
			if ( oldValue <= min ) {
				return;
			} else {
				newVal = oldValue - 1;
			}
		} else {
			if ( ! max ) {
				max = Number.MAX_SAFE_INTEGER;
			}
			if ( oldValue >= max ) {
				return;
			} else {
				newVal = oldValue + 1;
			}
		}

		input.value = newVal;
		input.dispatchEvent( new Event( "change" ) );

		e.preventDefault();
	});
});

// Handle mouseover shine effect + 3d tilt
var shine_cards = document.querySelectorAll( ".shine-on-hover, .shine-on-children-hover a" );
if ( shine_cards.length > 0 ) {
	var tilt_max = 5;
	function transform3dRotate(card, e) {
		var calcWidth = card.clientWidth;
		var calcHeight = card.clientHeight;
		var calcX = tilt_max * ( ( e.layerX - calcWidth / 2 ) / calcWidth );
		var calcY = tilt_max * ( ( e.layerY - calcHeight / 2 ) / calcHeight );
		card.style.setProperty( '--x', e.layerX + 'px' );
		card.style.setProperty( '--y', e.layerY + 'px' );
		card.style.setProperty( '--rotateX', calcY + 'deg' );
		card.style.setProperty( '--rotateY', calcX + 'deg' );
	}

	shine_cards.forEach( function( card ) {
		if ( null === card.querySelector( ".shine-canvas" ) ) {
			var shine_canvas = document.createElement( "span" );
			shine_canvas.setAttribute( "class", "shine-canvas" );
			card.appendChild( shine_canvas );
		}

		card.addEventListener( "mousemove", function(e) {
			window.requestAnimFrame( function() {
				transform3dRotate( card, e );
			} );
		});
		card.addEventListener( "mouseleave", function(e) {
		card.style.setProperty( '--rotateX', '0' );
		card.style.setProperty( '--rotateY', '0' );
		});
	});
}

// Handle tab navigation with hash links.
var custom_tabs = document.querySelectorAll( ".block-tabs" );
if ( custom_tabs.length > 0 ) {
	custom_tabs.forEach( function( tabs ) {
		tabs.querySelectorAll( ":scope > ul a" ).forEach( function( tab_link ) {
			tab_link.addEventListener( "click", function(e) {
				if ( e.target.classList.contains( "is-active" ) ) {
					e.preventDefault();
					return false;
				}

				var target = document.querySelector( e.target.getAttribute( "href" ) );
				target.setAttribute( "data-id", target.getAttribute( "id" ) );
				target.removeAttribute( "id" );
			});
		});
		tabs.classList.add( "loaded" );
	});

	window.addEventListener( "hashchange", function(e) {
		if ( ! window.location.hash ) {
			return;
		}

		var active_tab_content = document.querySelector( '.block-tab-content[data-id="' + window.location.hash.substring( 1 ) + '"]' );
		if ( null === active_tab_content ) {
			return;
		}

		active_tab_content.setAttribute( "id", active_tab_content.getAttribute( "data-id" ) );

		var tab_container = active_tab_content.parentElement;
		tab_container.querySelectorAll( ".block-tab-content:not(#" + active_tab_content.getAttribute( "data-id" ) + ")" ).forEach( function( inactive_container ) {
			inactive_container.classList.remove( "is-active" );
		});
		active_tab_content.classList.add( "is-active" );

		tab_container.querySelectorAll( ":scope > ul a" ).forEach( function( tab_link ) {
			if ( tab_link.getAttribute( "href" ) == window.location.hash ) {
				tab_link.classList.add( "is-active" );
			} else {
				tab_link.classList.remove( "is-active" );
			}
		});
	});

	if ( window.location.hash ) {
		var active_tab = document.querySelector( '.block-tabs > ul a[href="' + window.location.hash + '"]' );
		if ( null !== active_tab ) {
			active_tab.dispatchEvent( new Event( "click" ) );
			window.dispatchEvent( new Event( "hashchange" ) );
		}
	}
}

// Handle collapsible elements
var custom_collapses = document.querySelectorAll( ".block-collapse > a" );
if ( custom_collapses.length > 0 ) {
	var updateCollapsibleBoxes = function (e) {
		document.querySelectorAll( ".block-collapse.is-opened > a" ).forEach( function( collapse ) {
			var target = document.querySelector( collapse.getAttribute( "href" ) );
			target.style.maxHeight = target.scrollHeight + "px";
		});
	};
	custom_collapses.forEach( function( collapse ) {
		collapse.addEventListener( "click", function(e) {
			var target = document.querySelector( collapse.getAttribute( "href" ) );
			collapse.parentElement.classList.toggle( "is-opened" );
			if ( collapse.parentElement.classList.contains( "is-opened" ) ) {
				target.style.maxHeight = ( target.scrollHeight + 1 ) + "px";
				if ( collapse.parentElement.parentElement.classList.contains( "style-accordion" ) ) {
					var children = collapse.parentElement.parentNode.children;
					var i;
					for ( i = 0; i < children.length; i++ ) {
						if ( children[i] !== collapse.parentElement && children[i].classList.contains( "is-opened" ) ) {
							children[i].classList.remove( "is-opened" );
							var sibling_link = children[i].querySelector( children[i].querySelector( ":scope > a").getAttribute( "href" ) );
							sibling_link.style.maxHeight = 0;
						}
					}
				}
			} else {
				target.style.maxHeight = 0;
			}

			e.preventDefault();
		});
	});

	window.addEventListener( "resize", updateCollapsibleBoxes );
	updateCollapsibleBoxes();
}

// Handle episode players
var episode_players = document.querySelectorAll( ".episode-player audio, .episode-player video" );
if ( episode_players.length > 0 ) {
	episode_players.forEach( function( player ) {
		player.addEventListener( "play", function(e) {
			e.target.parentElement.classList.add( "is-loaded", "playing" );
			if ( document.body.classList.contains( "video-sticky" ) && e.target.parentElement.classList.contains( "episode-type-video" ) ) {
				document.body.classList.add( "video-sticky-playing" );
			}
		});
		player.addEventListener( "pause", function(e) {
			e.target.parentElement.classList.remove( "playing" );
		});
		player.addEventListener( "ended", function(e) {
			e.target.parentElement.classList.remove( "playing" );
		});
		player.addEventListener( "timeupdate", function(e) {
			var secs = Math.floor( e.target.currentTime % 60 ).toString().padStart(2, '0');
			var mins = Math.floor( e.target.currentTime / 60 ).toString().padStart(2, '0');
			var hours = Math.floor( mins / 60 );
			if ( hours < 1 ) {
				e.target.parentElement.querySelector( ".media-current-time" ).textContent = mins + ":" + secs;
			} else {
				e.target.parentElement.querySelector( ".media-current-time" ).textContent = hours.toString().padStart(2, '0') + ":" + mins + secs;
			}
			e.target.parentElement.querySelector( ".media-time-rail-current" ).style.width = ( e.target.currentTime/ e.target.duration * 100 ) + "%";
		});
		var play_buttons = player.parentElement.querySelectorAll( ".media-play-pause" );
		play_buttons.forEach( function( play_button ) {
			play_button.addEventListener( "click", function(e) {
				var media = e.target.parentElement.parentElement.querySelector( "audio,video" );
				if ( ! media.paused ) {
					media.pause();
				} else {
					document.querySelectorAll( 'audio, video' ).forEach( function( el ) {
						if ( el != media ) {
							el.pause();
						}
					} );
					media.play();
				}
			});
		} );
		player.addEventListener( "click", function(e) {
			e.target.parentElement.querySelector( ".media-play-pause" ).dispatchEvent( new Event( "click" ) );
		});
		var media_rate = player.parentElement.querySelector( ".media-rate" );
		if ( media_rate ) {
			media_rate.addEventListener( "click", function(e) {
				var media          = e.target.parentElement.parentElement.querySelector( "audio,video" );
				var playback_rates = e.target.dataset.rates.split(' ');
				var current_rate   = playback_rates.shift();
				playback_rates.push( current_rate );
				e.target.dataset.rates = playback_rates.join(' ');
				e.target.textContent   = current_rate + 'x';
				media.playbackRate     = parseFloat( current_rate );
			});
		}
		player.parentElement.querySelector( ".media-time-rail" ).addEventListener( "click", function(e) {
			var media          = e.target.parentElement.parentElement.querySelector( "audio,video" );
			var timeline_width = window.getComputedStyle( e.target ).width;
			var timeline_val   = e.offsetX / parseInt( timeline_width, 10 );
			if ( timeline_val < 0.01 ) {
				media.currentTime = 0;
			} else {
				media.currentTime = timeline_val * media.duration;
			}
		});
		var media_fullscreen = player.parentElement.querySelector( ".media-fullscreen" );
		if ( media_fullscreen ) {
			media_fullscreen.addEventListener( "click", function(e) {
				var parent = e.target.parentElement.parentElement;
				if (document.fullscreenElement) {
					document.exitFullscreen();
				} else {
					parent.requestFullscreen();
				}
			});
			player.parentElement.addEventListener( "fullscreenchange", function(e) {
				if (document.fullscreenElement) {
					e.target.classList.add( "is-fullscreen" );
				} else {
					e.target.classList.remove( "is-fullscreen" );
				}
			});
		}
		var media_pip = player.parentElement.querySelector( ".media-pip" );
		if ( media_pip && ( "pictureInPictureEnabled" in document ) ) {
			media_pip.addEventListener( "click", function(e) {
				if (document.pictureInPictureElement) {
					document.exitPictureInPicture();
				} else if ( document.pictureInPictureEnabled ) {
					var media = e.target.parentElement.parentElement.querySelector( "video" );
					media.requestPictureInPicture();
				}
			});
			player.parentElement.classList.add( "is-pip-supported" );
		}
		if ( player.parentElement.classList.contains( "episode-type-video" ) ) {
			var inactivity_timer;
			var user_activity;
			var activity_check_timer = setInterval( function() {
				if ( user_activity ) {
					// reset activity tracker
					user_activity = false;
					// if the user state was inactive, set the state to active
					if ( player.parentElement.classList.contains( "is-inactive" ) ) {
						player.parentElement.classList.remove( "is-inactive" );
					}
					// clear any existing inactivity timeout to start the timer over
					clearTimeout( inactivity_timer );

					// if no more activity has occurred the user will be considered inactive
					inactivity_timer = setTimeout( function() {
						if ( ! user_activity ) {
							player.parentElement.classList.add( "is-inactive" );
						}
					}, 2000);
				}
			}, 250);
			player.parentElement.addEventListener( "mousemove", function(e) {
				if ( document.documentElement.className.match( "no-touchevents" ) ) {
					user_activity = true;
				}
			});

			var sticky_dismiss = player.parentElement.querySelector( ".sticky-video-dismiss" );
			if ( sticky_dismiss ) {
				sticky_dismiss.addEventListener( "click", function(e) {
					e.preventDefault();
					player.parentElement.classList.add( "dismiss-sticky" );
				});
			}
		}
		var media_cover = player.parentElement.querySelector( ".media-cover" );
		if ( media_cover ) {
			media_cover.addEventListener( "click", function(e) {
				e.preventDefault();
				e.target.parentElement.querySelector( ".media-play-pause" ).dispatchEvent( new Event( "click" ) );
			});
		}
	});
}

// Handle episode embeds
var episode_embeds = document.querySelectorAll( ".episode-player iframe" );
if ( episode_embeds.length > 0 ) {
	episode_embeds.forEach( function( embed ) {
		embed.parentElement.addEventListener( "click", function(e) {
			var embed = e.target.parentElement.querySelector( "iframe" );
			var embed_src = embed.getAttribute( "data-src" );
			embed.src = embed_src;
			embed.parentElement.classList.add( "is-loaded" );
			if ( document.body.classList.contains( "video-sticky" ) && e.target.parentElement.classList.contains( "episode-type-video-embed" ) ) {
				document.body.classList.add( "video-sticky-playing" );
			}
			e.preventDefault();
		});
	});
}

// Handle episode jumping points
var episode_jumps = document.querySelectorAll( '.episode-jumping-point[href^="#"]' );
if ( episode_jumps.length > 0 ) {
	episode_jumps.forEach( function( jump ) {
		jump.addEventListener( "click", function(e) {
			e.preventDefault();
			var media = document.querySelector( "#featured-media .episode-player audio, #featured-media .episode-player video" );
			var jump_sec = 0, m = 1, p = e.target.getAttribute( "href" ).substr( 1 ).split( ":" );
			if ( p.length > 0  ) {
				media.play();
				while ( p.length > 0 ) {
					jump_sec += m * parseInt( p.pop(), 10 );
					m *= 60;
				}
				media.currentTime = jump_sec;
			}
		});
	});
}

// Handle episode video player stickiness.
if ( document.body.classList.contains( "video-sticky" ) ) {
	var featured_episode = document.querySelector( "#featured .featured-episode" );
	var featured_height  = 0;
	var stickyTopLimit   = 0;
	var isSticky;

	var updateStickyVariables = function() {
		// reset featured episode height
		featured_episode.style.height = '';
		// compute featured episode height
		var featured_styles = window.getComputedStyle( featured_episode );
		featured_height = Math.ceil( featured_episode.offsetHeight + parseFloat( featured_styles['marginTop'] ) + parseFloat( featured_styles['marginBottom'] ) );
		stickyTopLimit = featured_height;
		if ( ! document.body.classList.contains( "navbar-transparent" ) ) {
			var topStyles = window.getComputedStyle( topNav );
			stickyTopLimit += getTopNavHeight();
		}
		// if ( $adminbar.length > 0 && "fixed" === $adminbar.css( "position" ) ) stickyTopLimit -= $adminbar.outerHeight();
		if ( Number.isNaN( stickyTopLimit ) ) {
			stickyTopLimit = 0;
		}
	};

	var stickyVideoScrollHandler = function(e) {
		isSticky = document.body.classList.contains( "video-is-sticky" );
		if ( window.scrollY >= stickyTopLimit ) {
			if ( ! isSticky ) {
				document.body.classList.add( "video-is-sticky" );
				featured_episode.style.height = featured_height + 'px';
			}
		} else {
			if ( isSticky ) {
				document.body.classList.remove( "video-is-sticky" );
				featured_episode.style.height = '';
			}
		}
	};

	var stickyVideoResizeHandler = function (e) {
		// check if we are in mobile view (if mobile hamburger toggle is visible)
		if ( null === document.querySelector( "#menu-toggle" ).offsetParent ) {
			isSticky = document.body.classList.contains( "video-is-sticky" );
			document.body.classList.remove( "video-is-sticky" );
			updateStickyVariables();
			if ( isSticky ) {
				document.body.classList.add( "video-is-sticky" );
			}

			// On scroll, we want to stick/unstick the navigation.
			if ( ! featured_episode.classList.contains( "video-sticky-watching" ) ) {
				featured_episode.classList.add( "video-sticky-watching" );
				window.addEventListener( "scroll", stickyVideoScrollHandler, false );
			}
		} else {
			if ( featured_episode.classList.contains( "video-sticky-watching" ) ) {
				featured_episode.classList.remove( "video-sticky-watching" );
				window.removeEventListener( "scroll", stickyVideoScrollHandler, false );
				document.body.classList.remove( "video-is-sticky" );
			}
		}
	};
	window.addEventListener( "resize", stickyVideoResizeHandler );

	stickyVideoResizeHandler();
	if ( null === document.querySelector( "#menu-toggle" ).offsetParent ) {
		stickyVideoScrollHandler();
	}
}

// Pause background videos on mobile, when browser tab is inactive
var background_videos = document.querySelectorAll( '.featured-media > video[autoplay], .sales-box > video[autoplay]' );
if ( background_videos.length > 0 ) {
	var pauseBgVideos = function(state) {
		background_videos.forEach( function( video ) {
			if ( state ) {
				if ( video.paused ) {
					video.play();
				}
			} else {
				if ( ! video.paused ) {
					video.pause();
				}
			}
		});
	};
	var pauseMobileBgVideosResizeHandler = function (e) {
		// check if we are in mobile view (if mobile hamburger toggle is visible)
		if ( null === document.querySelector( "#menu-toggle" ).offsetParent ) {
			pauseBgVideos(true);
		} else {
			pauseBgVideos(false);
		}
	};
	var pauseInactiveBgVideosHandler = function (e) {
		// check if browser tab is inactive
		if ( document.visibilityState === 'hidden' ) {
			pauseBgVideos(false);
		} else {
			if ( null === document.querySelector( "#menu-toggle" ).offsetParent ) {
				pauseBgVideos(true);
			}
		}
	};

	window.addEventListener( "resize", pauseMobileBgVideosResizeHandler );
	document.addEventListener ("visibilitychange", pauseInactiveBgVideosHandler );
	pauseMobileBgVideosResizeHandler();
}

// Performant smooth scrolling using requestAnimationFrame
function smoothScrollTo( yPos, animDuration = 1000 ) {
	var startY     = window.pageYOffset;
	var difference = yPos - startY;
	var startTime  = window.performance.now();

	function smoothScrollStep() {
		var progress = ( window.performance.now() - startTime ) / animDuration - 1;
		var amount   = progress * progress * progress + 1; // easeOutCubic
		window.scrollTo({ top: startY + amount * difference });
		if ( progress < 0 ) {
			window.requestAnimFrame( smoothScrollStep );
		}
	}
	smoothScrollStep();
}

// Toggle go-to-top visibility and avoid using any event on mobile devices (for better performance).
var scrollTopButton = document.querySelector( "#scroll-to-top" );
if ( null !== scrollTopButton ) {
	var scrollTopAction = false;
	var scrollTopDuration = getComputedStyle(document.body).getPropertyValue( "--custom--animation-duration-more" );
	if ( scrollTopDuration ) {
		scrollTopDuration = parseInt( parseFloat( scrollTopDuration ) * ( scrollTopDuration.indexOf( "ms" ) !== -1 ? 1 : 1000 ), 10 );
	} else {
		scrollTopDuration = 1000;
	}

	// Scroll to top functionality.
	scrollTopButton.addEventListener( "click", function(e) {
		scrollTopButton.classList.add( "scrolling" );
		scrollTopButton.classList.remove( "active" );
		smoothScrollTo( 0, scrollTopDuration );
		setTimeout(function(){
			scrollTopButton.classList.remove( "scrolling" );
		}, scrollTopDuration);
		e.preventDefault();
		return false;
	});

	var scrollTopLimit   = 0;
	var scrollTopHandler = function (e) {
		scrollTopButton.classList.toggle( "active", window.pageYOffset > scrollTopLimit );
	};
	var scrollResizeHandler = function (e) {
		if ( scrollTopButton.classList.contains( "scrolling" ) ) {
			return;
		}
		if ( null === document.querySelector( "#menu-toggle" ).offsetParent ) {
			if ( ! scrollTopButton.classList.contains( "watching" ) ) {
				scrollTopButton.classList.add( "watching" );
				window.addEventListener( "scroll", scrollTopHandler, false );
				scrollTopHandler();
			}
		} else {
			if ( scrollTopButton.classList.contains( "watching" ) ) {
				scrollTopButton.classList.remove( "watching" );
				window.removeEventListener( "scroll", scrollTopHandler, false );
			}
		}
	};
	window.addEventListener( "resize", scrollResizeHandler );
	scrollResizeHandler();
}

// Update height variable of navigation for various CSS styling
function getTopNavHeight() {
	var topNav    = document.querySelector( "#top-header" );
	// var topStyles = window.getComputedStyle( topNav );
	// return Math.ceil( topNav.offsetHeight + parseFloat( topStyles['marginTop'] ) + parseFloat( topStyles['marginBottom'] ) );
	return Math.ceil( topNav.offsetHeight );
}

var topNavComputeResizeHandler = function (e) {
	var topNavHeight = getTopNavHeight();
	if ( document.body.classList.contains( "navbar-is-sticky" ) ) {
		document.body.style.setProperty( "--spacing--nav-height-sticky", topNavHeight + "px" );
	} else {
		document.body.style.setProperty( "--spacing--nav-height", topNavHeight + "px" );
	}
};
window.addEventListener( "resize", topNavComputeResizeHandler );
topNavComputeResizeHandler();

// Handle navigation stickiness.
if ( document.body.classList.contains( "navbar-sticky" ) ) {
	var topNav   = document.querySelector( "#top-header" );
	var featured = document.querySelector( "#featured" );
	var topNavHeight;
	var stickyTopLimit = 0;
	var isSticky;

	var updateStickyVariables = function() {
		var topStyles = window.getComputedStyle( topNav );
		topNavHeight = getTopNavHeight();

		if ( null !== featured ) {
			var featured_styles = window.getComputedStyle( featured );
			var featured_height = Math.ceil( featured.offsetHeight + parseFloat( featured_styles['marginTop'] ) + parseFloat( featured_styles['marginBottom'] ) );
			stickyTopLimit = featured_height;
			if ( ! document.body.classList.contains( "navbar-transparent" ) ) {
				stickyTopLimit += topNavHeight;
			}
			// if ( $adminbar.length > 0 && "fixed" === $adminbar.css( "position" ) ) stickyTopLimit -= $adminbar.outerHeight();
		} else {
			stickyTopLimit = 0;
		}
		if ( Number.isNaN( stickyTopLimit ) ) {
			stickyTopLimit = 0;
		}
	};

	var topNavScrollHandler = function(e) {
		isSticky = document.body.classList.contains( "navbar-is-sticky" );
		if ( window.scrollY >= stickyTopLimit ) {
			if ( ! isSticky ) {
				document.body.classList.add( "navbar-is-sticky" );
				// update height variable of the sticky navigation
				topNavComputeResizeHandler();
			}
		} else {
			if ( isSticky ) {
				document.body.classList.remove( "navbar-is-sticky" );
				topNavComputeResizeHandler();
			}
		}
	}

	var topNavResizeHandler = function (e) {
		// check if we are in mobile view (if mobile hamburger toggle is visible)
		if ( null === document.querySelector( "#menu-toggle" ).offsetParent ) {
			isSticky = document.body.classList.contains( "navbar-is-sticky" );
			document.body.classList.remove( "navbar-is-sticky" );
			updateStickyVariables();
			if ( isSticky ) {
				document.body.classList.add( "navbar-is-sticky" );
			}

			// On scroll, we want to stick/unstick the navigation.
			if ( ! topNav.classList.contains( "navbar-sticky-watching" ) ) {
				topNav.classList.add( "navbar-sticky-watching" );
				window.addEventListener( "scroll", topNavScrollHandler, false );
			}
		} else {
			if ( topNav.classList.contains( "navbar-sticky-watching" ) ) {
				topNav.classList.remove( "navbar-sticky-watching" );
				window.removeEventListener( "scroll", topNavScrollHandler, false );
				document.body.classList.remove( "navbar-is-sticky" );
			}
		}
	};
	window.addEventListener( "resize", topNavResizeHandler );

	topNavResizeHandler();
	topNavScrollHandler()
}

if ( typeof Fancybox !== "undefined" ) {
	Fancybox.defaults.hideScrollbar = false;
}

window.requestAnimFrame = ( function() {
	return window.requestAnimationFrame  ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame    ||
		window.oRequestAnimationFrame      ||
		window.msRequestAnimationFrame     ||
		function( callback ){
			window.setTimeout( callback, 1000 / 60 );
		};
})();
