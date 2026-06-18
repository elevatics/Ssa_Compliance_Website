const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ?? "https://api.legum.ai"
).replace(/\/$/, "");

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
};

export type BookDemoData = {
  name: string;
  email: string;
  companyName: string;
  designation: string;
  mobile: string;
  location: string;
  enquiryInfo: string;
  howYouHearAboutUs: string;
  message: string;
};

type OTPVerifyData = {
  email: string;
  otp: number;
};

export async function registerBookDemoUser(
  data: BookDemoData,
): Promise<ApiResponse<{ message: string }>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/book-demo-user/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || result.message || "Registration failed",
      };
    }

    return {
      success: true,
      data: result,
      message: result.message || "Registration successful. OTP sent to your email.",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Network error occurred",
    };
  }
}

export async function verifyBookDemoOTP(
  data: OTPVerifyData,
): Promise<ApiResponse<{ message: string }>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/book-demo-user/otp/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || result.message || "OTP verification failed",
      };
    }

    return {
      success: true,
      data: result,
      message: result.message || "OTP verified successfully",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Network error occurred",
    };
  }
}

export async function resendBookDemoOTP(
  email: string,
): Promise<ApiResponse<{ message: string }>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/book-demo-user/otp/resend`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || result.message || "Failed to resend OTP",
      };
    }

    return {
      success: true,
      data: result,
      message: result.message || "OTP resent successfully",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Network error occurred",
    };
  }
}
