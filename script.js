document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation handling
  const mobileToggle = document.querySelector(".mobile-toggle");
  const mobileNavPanel = document.querySelector(".mobile-nav-panel");
  const closeBtn = document.querySelector(".close-btn");

  mobileToggle.addEventListener("click", () => {
      mobileNavPanel.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
      mobileNavPanel.classList.remove("active");
  });

  document.addEventListener("click", (e) => {
      if (!mobileNavPanel.contains(e.target) && !mobileToggle.contains(e.target)) {
          mobileNavPanel.classList.remove("active");
      }
  });

  // Smooth scrolling for navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function(e) {
          e.preventDefault();
          const targetId = this.getAttribute("href");
          if (targetId !== "#") {
              const targetElement = document.querySelector(targetId);
              if (targetElement) {
                  targetElement.scrollIntoView({
                      behavior: "smooth",
                  });
              }
          }
          if (mobileNavPanel.classList.contains("active")) {
              mobileNavPanel.classList.remove("active");
          }
      });
  });

  // Load research metrics on page load
  loadResearchMetrics();
});

function loadResearchMetrics() {
    const cachedData = JSON.parse(localStorage.getItem("scholarData"));
    const lastFetchTime = localStorage.getItem("lastFetchTime");
    const currentTime = new Date().getTime();

    // Use cached data if less than an hour old
    if (cachedData && lastFetchTime && currentTime - lastFetchTime < 3600000) {
            updateResearchMetrics(cachedData);
    } else {
            // Fallback data since no real API is available
            const fallbackData = {
                    citations: 796,
                    publications: 40,
                    hIndex: 15,
                    citationYears: [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
                    citationsPerYear: [7, 19, 16, 20, 23, 28, 22, 13, 40, 49, 51, 60, 61, 65, 51, 84, 77, 100, 7]
            };
            localStorage.setItem("scholarData", JSON.stringify(fallbackData));
            localStorage.setItem("lastFetchTime", currentTime);
            updateResearchMetrics(fallbackData);
    }
}

function updateResearchMetrics(data) {
    const metricsContainer = document.getElementById("metrics-container");
    metricsContainer.innerHTML = `
            <div class="col-md-4 text-center">
                    <div class="metric-card">
                            <div class="metric-value">${data.citations}</div>
                            <div class="metric-label">Total Citations</div>
                    </div>
            </div>
            <div class="col-md-4 text-center">
                    <div class="metric-card">
                            <div class="metric-value">40</div>
                            <div class="metric-label">Number of Publications</div>
                    </div>
            </div>
                        <div class="col-md-4 text-center">
                    <div class="metric-card">
                            <div class="metric-value">${data.hIndex}</div>
                            <div class="metric-label">h-index</div>
                    </div>
            </div>
    `;

    updateCitationChart(data);
}

function updateCitationChart(data) {
  const ctx = document.getElementById("publicationsChart").getContext("2d");

  // Destroy existing chart if it exists
  if (window.citationChart instanceof Chart) {
      window.citationChart.destroy();
  }

  window.citationChart = new Chart(ctx, {
      type: "bar",
      data: {
          labels: data.citationYears,
          datasets: [{
              label: "Citations per Year",
              data: data.citationsPerYear,
              backgroundColor: "#0071e3",
              borderColor: "#005bb5",
              borderWidth: 1
          }]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
              y: {
                  beginAtZero: true,
                  grid: {
                      color: "rgba(0, 0, 0, 0.05)"
                  }
              },
              x: {
                  grid: {
                      display: false
                  }
              }
          },
          plugins: {
              legend: {
                  display: false
              },
              tooltip: {
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  padding: 10
              }
          }
      }
  });
}

// This is for the contact
document.querySelector('a[href^="mailto"]').addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default behavior temporarily
        const email = 'n.shukla@cineca.it';
        
        // Try to open the mailto link
        window.location.href = `mailto:${email}`;
        
        // Set a timeout to check if the email client opened (optional fallback)
        setTimeout(() => {
            if (!document.hidden && !window.location.href.startsWith('mailto:')) {
                // If the email client didn't open (e.g., no default client), offer a fallback
                if (confirm(`Could not open your email client. Would you like to copy the email address (${email}) or open a web form?`)) {
                    // Copy email to clipboard
                    navigator.clipboard.writeText(email).then(() => {
                        alert('Email address copied to clipboard: ' + email);
                    }).catch(err => {
                        alert('Failed to copy email. Please manually copy: ' + email);
                    });
                }
            }
        }, 1000); // Check after 1 second
    });


function openEmailEditor(email) {
    // Try to open the mailto link
    window.location.href = `mailto:${email}`;
    
    // Set a timeout to check if the email client opened (1 second)
    setTimeout(() => {
        if (!document.hidden && !window.location.href.startsWith('mailto:')) {
            // If the email client didn’t open, copy the email to clipboard
            navigator.clipboard.writeText(email).then(() => {
                alert('Could not open your email app. Email address copied to clipboard: ' + email);
            }).catch(err => {
                alert('Failed to copy email. Please manually use: ' + email);
            });
        }
    }, 1000); // Check after 1 second
}
