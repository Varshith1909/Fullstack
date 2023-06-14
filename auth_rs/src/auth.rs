use auth0::Auth0Client;
use rocket::http::Status;
use rocket::request::{self, FromRequest, Request};
use rocket::Outcome;

// Define a custom request guard for authorization
struct AuthenticatedUser {
    // Define any additional user properties you need
    // You can extract these from the ID token provided by Auth0
    user_id: String,
    email: String,
}

// Implement the FromRequest trait for the custom request guard
impl<'a, 'r> FromRequest<'a, 'r> for AuthenticatedUser {
    type Error = ();

    fn from_request(request: &'a Request<'r>) -> request::Outcome<Self, Self::Error> {
        // Retrieve the access token from the request headers
        let access_token = match request.headers().get_one("Authorization") {
            Some(token) => {
                // Remove the "Bearer " prefix from the token string
                let token = token.trim_start_matches("Bearer ");
                token.to_string()
            }
            None => return Outcome::Failure((Status::Unauthorized, ())),
        };

        // Initialize the Auth0 client
        let client = Auth0Client::new("dev-2ere3xom3pqjdylj.us.auth0.com", "jVB18Gzldk9aNyJbfBIxgP2X3CExFEIy");

        // Validate the access token and extract user information
        match client.decode_token::<Auth0Claims>(&access_token) {
            Ok(claims) => {
                // Extract the required user properties from the claims
                let user_id = claims.sub;
                let email = claims.email;

                // Create an instance of the AuthenticatedUser struct
                let authenticated_user = AuthenticatedUser { user_id, email };

                Outcome::Success(authenticated_user)
            }
            Err(_) => Outcome::Failure((Status::Unauthorized, ())),
        }
    }
}

// Define the claims struct to deserialize the ID token claims
#[derive(Deserialize)]
struct Auth0Claims {
    sub: String,   // User ID
    email: String, // User email
    // Add any additional claim fields you need
}

// Example usage of the custom request guard
#[get("/protected")]
fn protected_route(user: AuthenticatedUser) -> String {
    // Access the authenticated user's properties
    let user_id = user.user_id;
    let email = user.email;

    format!("Authenticated User: ID={}, Email={}", user_id, email)
}

fn main() {
    rocket::ignite().mount("/", routes![protected_route]).launch();
}
