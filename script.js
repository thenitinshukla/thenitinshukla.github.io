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
                    citations: 805,
                    publications: 34,
                    hIndex: 15,
                    citationYears: [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
                    citationsPerYear: [7, 19, 16, 20, 23, 28, 22, 13, 40, 49, 51, 60, 61, 65, 51, 84, 77, 99, 17]
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

// This is for the  blog 


document.addEventListener('DOMContentLoaded', function() {
    // Sample blog data - in a real implementation, this would come from a database
    const blogPosts = [
        {
            id: 1,
            title: "Why Flops Aren’t Everything in GPU Computing?",
            excerpt: "A deeper dive into why other factors like memory bandwidth, latency, and thread management are crucial for understanding real-world GPU performance.",
            content: `<p>When evaluating GPU performance, it’s easy to get caught up in the sheer number of floating-point operations per second (flops) 
            a GPU can perform. However, flops alone don’t tell the whole story. Here’s a deeper
            dive into why other factors like memory bandwidth, latency, and thread management are crucial
            for understanding real-world GPU performance.</p>

            <h3>Flops vs. Bandwidth: A Traffic Jam Problem</h3>
            
            <p>Imagine FLOPS as a super-fast sports car. Sounds amazing, right? But if you’re stuck in traffic,
            that speed doesn’t help you get anywhere.
            In GPU computing, the “traffic” is memory bandwidth — the rate at which data 
            moves between memory and the GPU’s processing units.</p>

            <h3>Latency: Waiting Around Hurts</h3>

            <p>Even with high bandwidth, there’s still latency—the delay before data starts moving.
            Think of it like ordering online: shipping might be fast (bandwidth),
            but you still wait for the package to leave the warehouse (latency). 
            In GPUs, fetching data from memory is far slower than performing a quick calculation like ax + y.
            The math is fast, but loading x and y from memory? That’s the bottleneck.
            
            <p> This waiting time kills performance in most programs. </p>
            
            <h3>Threads: GPU’s Trick to Stay Busy</h3>

            <p>So, how do GPUs handle all this latency? They use threads — lots of them. 
            Threads are like small workers, each handling a tiny task. GPUs run thousands of threads at once, 
            so when some threads are waiting for data, others keep working. It’s like a factory line: 
            if one worker’s waiting for parts, someone else picks up the slack. </p>
            
            <p> A GPU has 2,048 threads per processing unit, but only 32 can run at any given moment. 
            These 2,048 threads are organized into smaller groups called warps, which typically consist of 32 threads each. 
            The remaining threads wait their turn, jumping into action as soon as space becomes available. 
            This approach keeps the GPU busy, even when data delivery is delayed. </p>
            
            <p> The GPU efficiently switches between these warps, scheduling them to run on the processing units. 
            This rapid switching ensures that the hardware remains fully utilized, even when some threads are stalled waiting for data.</p>

            
            <h3>Memory Hierarchy: Keep Data Close</h3>
            <p>To make the threads work well, GPUs have a memory system with different levels: </p>
            
            <ul>
                <li><strong>Registers: </strong> Super-fast and close by, but there’s not much room.</li>
                <li><strong>L1 Cache/Shared Memory: </strong> Nearby and quick to grab, great for sharing data between threads.</li>
                <li><strong>L2 Cache: </strong> A little slower, but still decent.</li>
                <li><strong>HBM (Main Memory): </strong> High bandwidth, but slower to access.</li>
                <li><strong>PCIe: </strong> The slowest link — avoid unless necessary.</li>
            </ul>
            
            <p>The closer the data, the faster your program runs. 
            If you can keep data in registers or shared memory, you avoid long delays and make the most of your GPU’s power.</p>

            <h3>Matrix Multiplication: Where Flops Shine </h3>
            <p> There’s one case where flops matter: matrix multiplication. 
            Imagine a grid of numbers — like grades for 50 students across 50 assignments.
            You load the data once and then do a ton of calculations with it. 
            For a 50x50 grid, you load 2,500 numbers but perform 125,000 operations. 
            That’s a lot of work for each piece of data, so the GPU’s flops really get used here. 
            On large matrices, this is where GPUs show their true power. </p>
            
            <h3> Programming the GPU: Teamwork Makes It Work</h3>
            <p> GPUs organize tasks with a system of grids, blocks, and threads. Here’s how it works: </p>
            <ul>
                <li><strong>Grids: </strong> Big groups splitting up the work.</li>
                <li><strong>Blocks: </strong> Teams within a grid, each handling a part of the task.</li>
                <li><strong>Threads: </strong> Workers in a block, sharing tools (shared memory) to get things done.</li>
            </ul>
            <p> This structure lets GPUs handle massive jobs — like image processing — by breaking them into manageable pieces.</p>
            
            <h3> Beyond the Basics: Algorithm Efficiency and GPU Features </h3>
            
            <p> While data locality and thread management are foundational, other factors can boost performance further.
            Algorithm efficiency matters — designing code that maximizes parallel execution is key since GPUs thrive on handling many tasks at once. 
            Additionally, GPU-specific features like tensor cores (specialized hardware for tasks like deep learning) can accelerate certain workloads.
            </p>
            
            <h3> The Real Deal: It’s All About Data </h3>
            <p> In the end, GPU performance isn’t about how many flops you have. 
            It’s about where your data is. Flops are easy to come by, but if your data is stuck in slow memory, 
            they’re useless. To make a GPU program fast: </p>
            <ul>
                <li> Keep data close — in registers or shared memory.</li>
                <li> Use lots of threads to cover up delays.</li>
                <li> Pick tasks like matrix multiplication that reuse data a lot.</li>
            </ul>
            <p> Next time you’re working on a GPU program, don’t obsess over the flops. Ask yourself, 
            <strong>“Where’s my data?”</strong> That’s the key to unlocking real speed.</p>    
            `,
            date: "February 26, 2025",
            category: "tech",
            featured: true,
            imageUrl: "images/NVIDIA_GB200.jpg",
            readTime: "3 min read",
            author: "Nitin Shukla"
        },
        {
            id: 2,
            title: "GPU Programming Guide",
            excerpt: "This guide will help you understand how to use GPU technology for scientific computing, with a focus on the essentials.",
            content: `<p>High-performance computing is essential for modern research. 
            This post explores a quick guide about CUDA programming.</p>

            <h3> What’s a GPU and Why Use ? </h3>
            
            <p> A GPU (Graphics Processing Unit) is a specialized processor designed to accelerate tasks that require heavy computation. Originally made for rendering graphics in video games, GPUs are now widely used in scientific computing, machine learning, and many other fields. </p>

            The main difference between a GPU and a CPU (Central Processing Unit) is in how they process tasks:

            <ul>
                <li> CPU: A few powerful cores that handle tasks sequentially.</li>
                <li> GPU: Thousands of smaller cores that can perform many tasks in parallel.</li>
            </ul>

            <img src="images/CPUGPU.png" alt="GPU vs CPU" class="img-fluid">

            <p> This makes GPUs especially useful for operations that can be split into smaller tasks, such as: </p>

            <ul>
                <li> Matrix multiplications</li>
                <li> Neural network calculations</li>
                <li> Large-scale data processing</li>
            </ul>
            
            <h3> Why GPUs are Great for Scientific Computing </h3>
            <ul>
                <li> Massive Parallelism: GPUs can run thousands of tasks at once, which makes them ideal for processing large datasets.</li>
                <li> High Bandwidth: GPUs can access memory much faster than CPUs, enabling quick data processing.</li>
                <li> Energy Efficiency: Despite consuming more power, GPUs provide significantly more computational power per watt compared to CPUs.</li>
            </ul>

            <h3> How to Program GPUs </h3>
            
            <p> To use a GPU, you need to write code that can run on it. Here are the main options:</p>
            <ul>
                <li> CUDA/HIP: These allow you to write small functions called “kernels” for NVIDIA and AMD GPUs using a language similar to C/C++.</li>
                <li> SYCL: Works across multiple devices like NVIDIA and AMD GPUs, offering flexibility but can be trickier to set up.</li>
                <li> Directives: OpenACC works well with NVIDIA GPUs, while OpenMP offloading is cross-platform.</li>
                <li> Libraries: Pre-built tools like cuBLAS (for math) or PyTorch (for machine learning) use GPUs behind the scenes, saving you time.</li>
            </ul>
            <p> If you are just starting, CUDA is a good place to begin, especially for NVIDIA GPUs.</p>

            <h3> Example: Adding Numbers Using CUDA </h3>

            <p> Here’s a simple CUDA example where the task is adding two lists of numbers: </p>

            <pre><code>
            __global__ void addVectors(float* a, float* b, float* c, int n) {
                int i = blockIdx.x * blockDim.x + threadIdx.x;
                if (i < n) {
                    c[i] = a[i] + b[i];
                }
            }
            </code></pre>

            <h3> Explanation: </h3>

            <ul>
                <li> __global__: This keyword tells CUDA that this function is a "kernel" that will run on the GPU.</li>
                <li> Thread and Block Indexing: CUDA divides the work into blocks and assigns threads to each block. The blockIdx.x, blockDim.x, and threadIdx.x variables are used to calculate the global index of each thread.</li>
                <li> Parallel Execution: Each thread adds one element from array a to the corresponding element in array b and stores the result in array c.</li>
            </ul>

            <h3> Steps for Running This on a GPU: </h3>

            <ol>
                <li> Allocate memory on the GPU for arrays a, b, and c.</li>
                <li> Copy the input data (a and b) to the GPU.</li>
                <li> Launch the kernel with an appropriate number of blocks and threads.</li>
                <li> Copy the results (c) back to the CPU.</li>
                <li> Free the GPU memory.</li>
            </ol>


            
            <h3>Key Optimization Strategies</h3>
            
            <p>When optimizing CUDA code, consider these essential strategies:</p>
            
            <ol>
                <li><strong>Memory Coalescing:</strong> Ensure that memory access patterns allow threads in a warp to access contiguous memory locations. This significantly improves memory bandwidth utilization.</li>
                <li><strong>Shared Memory Usage:</strong> Leverage shared memory for data that will be accessed multiple times by threads within the same block.</li>
                <li><strong>Occupancy Optimization:</strong> Balance the number of threads per block and registers per thread to maximize GPU occupancy.</li>
                <li><strong>Asynchronous Operations:</strong> Use CUDA streams to overlap computation with data transfers between host and device.</li>
                <li><strong>Kernel Fusion:</strong> Combine multiple small kernels into larger ones to reduce kernel launch overhead.</li>
            </ol>

            <h3> Conclusion</h3>
        
            <p> The real power of GPUs doesn’t lie in their raw computational speed but in how efficiently 
            you can move data around and make use of the massive parallelism they offer. When programming GPUs, 
            focus less on flops (the computational power) and more on data delivery. 
            The faster you can get data to the GPU and keep it there, the better your performance will be. </p>
            
            `,
            date: "January 28, 2025",
            category: "hpc",
            featured: true,
            imageUrl: "images/A100.jpg",
            readTime: "5 min read",
            author: "Nitin Shukla"
        },
        {
            id: 3,
            title: "Supercomputing in Europe: Current State and Future Directions",
            excerpt: "An overview of Europe's high-performance computing landscape, including the latest installations and upcoming projects in the European HPC initiative.",
            content: `<p>An overview of Europe's high-performance computing landscape, including the latest installations and upcoming projects in the European HPC initiative.</p>
            
            <p>
            Supercomputing, also known as High-Performance Computing (HPC), 
            involves using extremely powerful computers to perform complex calculations at lightning speed.
            These machines can process massive amounts of data and run simulations that would take years on a standard computer. 
            Think of them as the heavy lifters of the computing world, tackling tasks like modeling climate systems, simulating the behavior of molecules, or training advanced AI models.
            In this blog, we’ll take a look at the current state of supercomputing in Europe and explore where it’s heading in the future.
            </p>

            <p>Europe has made significant strides in high-performance computing over the past decade, with several world-class supercomputers now operational across the continent. 
            The European High-Performance Computing Joint Undertaking (EuroHPC JU) has been instrumental in coordinating these efforts.</p>
            
            <h3>Current European Supercomputing Landscape</h3>
            
            <p>Several major systems have recently come online:</p>
            
            <ul>
                <li><strong>LUMI</strong> (Finland): Based on AMD EPYC processors and AMD Instinct accelerators, LUMI delivers over 550 petaflops of peak performance.</li>
                <li><strong>Leonardo</strong> (Italy): Hosted at CINECA, Leonardo combines Intel Xeon processors with NVIDIA A100 GPUs to achieve 250+ petaflops.</li>
                <li><strong>MareNostrum 5</strong> (Spain): The latest iteration of BSC's flagship system features a hybrid architecture with both general-purpose and accelerated partitions.</li>
            </ul>

            <p>
            Currently, Europe has sevral operational supercomputers under the EuroHPC JU: IT4I (Czech Republic), Vega (Slovenia), MeluXina (Luxembourg), and Deucalion (Portugal).
            </p>
            
            <h3>The Path to Exascale</h3>
            
            <p>Europe's exascale ambitions are taking shape with several initiatives:</p>
            
            <ol>
                <li><strong>Jupiter</strong>: Planned for installation at Forschungszentrum Jülich, Jupiter aims to be Europe's first exascale system.</li>
                <li><strong>European Processor Initiative</strong>: This project is developing European processor technology to reduce dependence on non-European hardware.</li>
                <li><strong>Centers of Excellence</strong>: Specialized centers focusing on optimizing applications for next-generation systems.</li>
            </ol>

            
            <h3>Challenges and Opportunities</h3>
            
            <p>Despite impressive progress, several challenges remain:</p>
            
            <ul>
                <li>Energy efficiency concerns as systems grow larger</li>
                <li>Development of programming models that can effectively utilize increasingly heterogeneous architectures</li>
                <li>Training enough skilled personnel to develop and use these systems effectively</li>
            </ul>
            
            <p>These challenges also present opportunities for innovation in system design, programming models, and education.</p>
            
            <h3>Conclusion</h3>
            <p>Europe has come a long way in supercomputing, with powerful machines like JUPITER on the horizon and a clear plan for the future. Initiatives like the EuroHPC JU are driving progress, and efforts to develop homegrown technologies are helping Europe become more self-reliant. However, challenges remain, from catching up with global leaders to making supercomputing more accessible and sustainable.
            </p>
            <p>
            The road ahead is exciting, with plans for post-exascale systems, quantum integration, and a focus on building a complete supercomputing ecosystem. If Europe can continue to invest wisely and foster innovation, it has a real shot at becoming a world leader in supercomputing. But it won’t be easy—global competition is fierce, and the stakes are high. Still, with the right strategy, Europe’s supercomputing future looks bright.
            </p>

            
            `,
            date: "December 18, 2023",
            category: "hpc",
            featured: true,
            imageUrl: "images/EuroHPC.png",
            readTime: "4 min read",
            author: "Nitin Shukla"
        },

        {
            id: 4,
            title: "GPU Architecture Basics: Understanding the Heart of Modern GPUs",
            excerpt: "A detailed look at the architecture of modern GPUs, including key components like CUDA cores, Tensor Cores, and memory hierarchy.",
            content: `<p>
            Modern GPUs are powerhouses of computation, capable of handling massive workloads in parallel.
            But how do they work under the hood? This blog post takes a deep dive into the architecture of modern GPUs, 
            exploring key components like CUDA cores, Tensor Cores, and the memory hierarchy that make them so efficient.
            </p>
            
            <h3>Core Structure</h3>
            
            <p><strong>Streaming Multiprocessors (SMs) / Compute Units (CUs) </strong></p>

            <p>SMs (NVIDIA) or CUs (AMD) are the building blocks of a GPU. Each SM contains:</p>

            <ol>
                <li><strong>CUDA Cores/Stream Processors:</strong> Basic computation units executing arithmetic operations.</li>
                <li><strong>Registers:</strong> Fast memory storage for active threads.</li>
                <li><strong>Shared Memory/L1 Cache:</strong> Low-latency memory shared among cores in an SM.</li>
                <li><strong>Warp Schedulers:</strong> Manage thread execution, dispatching instructions to cores.</li>
            </ol>


            <h3>Memory Hierarchy</h3>
            
            <p>GPUs have a specialized memory system separate from the CPU’s main memory, optimized for high-bandwidth access and parallel workloads. The key levels are:</p>

            <ol
                <li><strong>Global Memory (GDDR/HBM):</strong> High-bandwidth, off-chip memory (e.g., GDDR6, HBM2) for large datasets. HBM offers superior bandwidth via 3D stacking.</li>
                <li><strong>Shared Memory:</strong> On-chip memory for thread collaboration within a block, enabling rapid data sharing.</li>
                <li><strong>Registers:</strong> Per-thread storage offering the fastest access.</li>
                <li><strong>L2 Cache:</strong> Shared across SMs, reducing global memory access latency.</li>
            </ol>

            <h3>Specialized Units</h3>

            <p>Modern GPUs feature specialized units for specific tasks:</p>
            <ul>
                <li><strong>Tensor Cores:</strong> Accelerate matrix operations common in deep learning, offering high throughput for mixed-precision calculations.</li>
                <li><strong>RT Cores:</strong> Ray tracing units for real-time rendering, tracing light paths for realistic graphics.</li>
                <li><strong>FP64 Units:</strong> Dedicated units for double-precision floating-point calculations, essential for scientific computing.</li>
            </ul>


            <h3> SIMT Execution Model</h3>
            
            <p> GPUs use a Single Instruction, Multiple Thread (SIMT) model to execute instructions across threads. </p>

            <h3> Parallel in GPUs</h3>
            <p> <strong> Thread Hierarchies:</strong> Threads are organized into blocks (groups of threads) and grids (groups of blocks), enabling efficient data sharing and synchronization.
            Threads are grouped into warps (32 threads each), which execute the same instruction in lockstep. 
            This allows the GPU to hide memory latency by switching between warps, keeping the cores busy.
            </p>

            <p> Thread-level parallelism: Multiple threads execute different instructions simultaneously.</p>
            <p> Instruction-level parallelism: Multiple instructions are executed in parallel within a thread.</p>
            <p> Data-level parallelism: Operations are performed on multiple data elements simultaneously.</p>
            <p> Task-level parallelism: Multiple tasks are executed concurrently across threads.</p>

            <h3> Conclusion</h3>

            <p> GPUs are complex beasts, with intricate architectures designed to handle massive parallel workloads efficiently.
            Understanding the core components like CUDA cores, memory hierarchy, and specialized units is key to optimizing performance in GPU-accelerated applications. 
            This architecture makes GPUs indispensable for modern computing tasks requiring high throughput,
            distinguishing them from CPUs and enabling their dominance in fields like gaming, AI, and scientific simulations.
            This architecture makes GPUs indispensable for modern computing tasks requiring high throughput, distinguishing them from CPUs 
            and enabling their dominance in fields like gaming, AI, and scientific simulations.
            </p>
            
            `,
            date: "August 10, 2022",
            category: "tech",
            featured: true,
            imageUrl: "images/gpu-architecture.jpg",
            readTime: "3 min read",
            author: "Nitin Shukla"
        },

        {
            id: 5,
            title: "Parallelization Strategies for Modern Scientific Codes",
            excerpt: "Effective parallelization is essential for maximizing performance on today's multicore systems. This post explores different strategies and their applications.",
            content: `<p>In the world of scientific computing, the ability to perform complex simulations and analyze vast datasets hinges on one critical factor: speed.
            As problems grow in size and intricacy, effective parallelization has become essential for maximizing performance on today’s multicore systems. 
            This blog post explores the diverse strategies for parallelizing modern scientific codes, their applications across various domains, and the key considerations for optimizing performance.</p>
            
            <p>Scientific computing has evolved dramatically with the advent of massively parallel architectures. 
            From traditional CPU clusters to GPU-accelerated systems and specialized hardware,
            researchers now have access to unprecedented computational power. 
            However, effectively harnessing this power requires careful consideration of parallelization strategies.</p>

            <h3> Why Parallelization Matters </h3>

            <p> Parallelization is the process of dividing a computational task into smaller,
            independent subtasks that can be executed simultaneously across multiple processing units. 
            This is vital in scientific computing, where simulations—such as climate modeling, molecular dynamics, 
            or astrophysical calculations—can take days, weeks, or even months on a single processor. </p>

            <p> The shift from single-core CPUs to multicore processors, GPUs,
            and distributed systems has redefined the landscape. 
            Modern hardware offers immense parallelism, but leveraging it effectively demands that scientific
             codes be designed with parallel execution in mind. Beyond speeding up computations, 
             parallelization enables researchers to tackle larger, more ambitious problems that were once out of reach.
             </p>
            
            <h3>Levels of Parallelism</h3>
            
            <p>Modern scientific codes typically exploit multiple levels of parallelism:</p>
            
            <ol>
                <li><strong>Distributed Memory Parallelism</strong>: Using MPI to distribute work across multiple nodes</li>
                <p> In distributed memory systems, multiple compute nodes (e.g., in a cluster) each have their own memory. Work is divided across these nodes, which communicate via message passing.</p>
                <p> MPI is the standard tool here, enabling processes to exchange data and coordinate efforts. </p>

                <li><strong>Shared Memory Parallelism</strong>: Using OpenMP or similar frameworks for multi-threading within a node</li>
                <p> In shared memory systems, multiple cores share access to the same memory. Here, parallelism is achieved through multi-threading, where threads run in parallel within a single process.</p>
                <p> OpenMP is a popular choice for shared memory parallelism, offering a simple and flexible way to parallelize loops and sections of code.</p>
                
                <li><strong>SIMD/Vectorization</strong>: Exploiting vector instructions within a core</li>
                <p>  At the core level, CPUs feature vector units that perform the same operation on multiple data points simultaneously (Single Instruction, Multiple Data, or SIMD). </p>
                <p>  Compilers can automatically vectorize code, but manual optimizations may be needed for complex algorithms.</p>
                
                <li><strong>Accelerator Offloading</strong>: Using GPUs or other accelerators for compute-intensive tasks</li>
                <p>  GPUs and other accelerators offer massive parallelism for specific tasks like matrix operations or deep learning. </p>
                <p>  Offloading compute-intensive kernels to these devices can yield significant speedups.</p>
                
            </ol>
            
            <h3>Hybrid Parallelization Models</h3>
            
            <p>For many applications, a hybrid approach combining multiple paradigms yields the best results. Common combinations include:</p>
            
            <ul>
                <li><strong>MPI + OpenMP</strong>: Using MPI for inter-node communication and OpenMP for intra-node parallelism</li>
                <li><strong>MPI + CUDA/HIP</strong>: Distributing work across nodes with MPI and offloading compute-intensive kernels to GPUs</li>
                <li><strong>MPI + OpenMP + CUDA</strong>: A three-level approach for maximum hardware utilization</li>
            </ul>
            
            <h3>Domain-Specific Approaches</h3>
            
            <p>Different scientific domains often benefit from specialized parallelization strategies:</p>
            
            <ul>
                <li><strong>Structured Grid Codes</strong>:
                Used in finite difference or finite volume methods to solve partial differential equations (PDEs) on regular grids,
                often use regular domain decomposition with ghost cell exchanges</li>
                <li><strong>Particle Methods</strong>: 
                Employed in simulations of interacting particles, like molecular dynamics or astrophysics.
                Spatial decomposition divides the simulation space, or particle-based load balancing distributes particles evenly across processors.

                </li>
                <li><strong>Spectral Methods</strong>: Typically parallelize across spectral modes or use parallel FFT libraries</li>
            </ul>
            
            <h3>Performance Considerations</h3>
            
            <p>When implementing parallel scientific codes, several factors affect performance:</p>
            
            <ul>
                <li><strong>Load balancing</strong></li>
                <p>
                Ensuring all processors have roughly equal workloads to avoid idle time. 
                Imbalanced loads leave some processors waiting, dragging down performance. 
                Dynamic techniques like work stealing or adaptive decomposition can redistribute tasks.
                </p>
                <li> <strong>Communication overhead </strong></li>
                <p>
                The time spent exchanging data between processors, especially in distributed systems.
                High overhead can bottleneck performance, particularly in strong scaling (faster solving of the same problem).
                Overlap communication with computation, use efficient collectives, or minimize data dependencies.
                </p>
                <li> <strong> Memory access patterns and data locality </strong></li>
                <p>
                 How data is accessed and stored, affecting cache efficiency.
                 Poor locality leads to cache misses, slowing execution.
                  Optimize data layouts, use blocking techniques, and ensure contiguous memory access.
    
                </p>
                <li> <strong> Synchronization costs </strong></li>
                <p>
                Overhead from coordinating threads or processes, such as through locks or barriers.
                Excessive synchronization can stall processors, reducing parallel efficiency.
                Minimize synchronization points, use non-blocking operations, and consider task-based models.
                </p>
                <p>Profiling tools like Intel VTune or NVIDIA Nsight are invaluable for spotting and addressing these issues.</p>
            </ul>
            
            <h3>Conclusion</h3>
            Parallelization is the linchpin of modern scientific computing, unlocking the power of multicore systems, GPUs, and clusters. By mastering levels of parallelism—distributed memory, shared memory, SIMD, and accelerators—and blending them into hybrid models, researchers can push computational boundaries. Tailoring strategies to specific domains and optimizing for performance factors like load balancing and data locality further amplify results.
            
            `,
            date: "November 20, 2021",
            category: "hpc",
            featured: false,
            imageUrl: "images/hpc.png",
            readTime: "5 min read",
            author: "Nitin Shukla"
        },
        {
            id: 6,
            title: "What is the fireball beam, and why does it matter so much to us?",
            excerpt: "Plasma instabilities play a crucial role in many astrophysical phenomena. This post discusses recent developments in modeling these complex behaviors.",
            content: `<p>Understanding plasma instabilities is fundamental to explaining various astrophysical processes. Recent computational advances have significantly improved our ability to model these complex phenomena.</p>
            
            <p>
            More than five decades ago, the U.S. Vela satellites accidentally discovered Gamma Ray Burst (GRBs). These satellites were designed to detect gamma radiation emitted by nuclear weapons tested in space. Although the purpose was to monitor nuclear activity by the Soviet Union or other nations, the Vela satellites instead detected intense bursts of GRBs coming from deep space. Since then, scientists reported several observations of GRBs (here is a brief history of GRBs);
            </p>

            <img src="images/GRB.jpg" alt="Gamma Ray Burst" class="img-fluid">

            <p> 
            These bursts were one of the most important discoveries in astrophysics of the century. GRBs are the most explosive flashes of cosmic γ-rays ever detected since the Big Bang. A typical photon from GRBs carries 100,000 times more energy than visible light. It is hundreds of times brighter than a typical supernova and about a million trillion times brighter than the Sun. GRBs releases enormous amount of energy (~1e51 erg) in a small volume of radius ∼1000 km. Such intense photon bursts lead to the pair (e-, e+) plasmas creation, known as a fireball (Bahcall & Ostriker 1997). As particles accelerate, they emit intense radiation bursts, with wavelengths ranging from γ-rays to radio waves.
            </p>

            <p>
            On 14th January 2019, NASA’s Neil Gehrels Swift Observatory detected light from a particular event, known as GRB 190114C, which was born about 4.5 billion years ago after a GRB explosion. Based on this measurements scientist determined radiation and the magnetic fields structure within the jet itself. However, one of the main scientific puzzles is, how these magnetic fields are generated and amplified in the first place (Widrow 2002; Kronberg 2002).
            </p>

            <img src="images/GRBs.jpg" alt="Gamma Ray Burst" class="img-fluid">



            <h3>What is a Fireball Beam?</h3>
            <p>GRBs are the most energetic events in the universe, releasing as much energy in a few seconds as our Sun will in its entire lifetime. The leading model for GRBs involves a relativistic jet of material ejected during a supernova or neutron star merger. This jet, moving at nearly the speed of light, interacts with surrounding matter, forming a "fireball" of plasma.</p>
            <p>As the fireball expands and cools, it emits radiation across the electromagnetic spectrum, from gamma rays to radio waves. Understanding the dynamics of this fireball is crucial for deciphering the origins of GRBs and the physical processes at play.</p>
            <p>One of the key challenges in modeling GRBs is capturing the complex plasma instabilities that arise in the fireball. These instabilities can dramatically affect the fireball's evolution, leading to the generation of magnetic fields, particle acceleration, and radiation emission.</p>

            <p>
            Over the past decades, scientists made a tremendous effort to understand the subject better. Nevertheless, there are many open questions in the field. Some of the question could be answered in the laboratory by carefully designing experiments that mimic astrophysical conditions. For example:
            </p>

            <ul>
                <li>How do magnetic fields get amplified in the fireball?</li>
                <li>What role do plasma instabilities play in particle acceleration?</li>
                <li>How do relativistic jets interact with their surroundings?</li>
                <li>Can we perform experiments to test the physics of relativistic jets interacting with plasma?</li>
                <li>What are the mechanisms for energy transfer between particles and fields?</li>
                <li>What are the signatures (e.g. in radiation) of the plasma instabilities and structure of magnetic fields within the jet itself?</li>
                <li>Which experimental huddles could we face when performing such complex experiments?</li>
            </ul>

            <h3>Designing experiments</h3>
            <p>Designing experiments to study plasma instabilities and relativistic jets is no small feat. It requires specialized facilities capable of generating and controlling high-energy plasmas under extreme conditions. Some of the key considerations for experimental design include:</p>
            <ul>
                <li>Creating high-energy plasmas that mimic the conditions of astrophysical jets</li>
                <li>Generating strong magnetic fields to study field amplification mechanisms</li>
                <li>Controlling plasma instabilities to observe their effects on particle acceleration</li>
                <li>Developing diagnostics to measure radiation and magnetic field structures</li>
                <li>Building computational models to interpret experimental results</li>
            </ul>

            <p>
            Designing such experiments and diagnostics could be very complex, but doable. Before performing experiments, the physics of ultra-relativistic beam-plasma interaction needs to be well understood. For this purpose, we have performed sophisticated computer simulations with the massively parallel particle in cell code OSIRIS using readily available (at SLAC) beam-plasma parameters to better understand some of the questions mentioned above. We have observed the long-time evolution of magnetic field (order of MGauss) generation due to plasma instabilities (N. Shukla et. al JPP 2018 & NJP 2020) in unmagnetized plasma.
            </p>

            <p> Also, play this cool movie ;).</p>
            <a href="https://vimeo.com/152712029" id="video-link">Watch the video</a>
    

            <h3>Conclusion</h3>
            <p> We believe that such a plasma process generates magnetic fields in the astrophysical system, such as GRBs. This is just the right time to explore these astrophysical conditions and reproduce these mechanisms in the lab, under controlled conditions, which were previously inaccessible.
            </p>
`,

            date: "May 12, 2020",
            category: "physics",
            featured: false,
            imageUrl: "images/GRBs.jpg",
            readTime: "5 min read",
            author: "Nitin Shukla"
        }
    ];

    // Variables
    const postsPerPage = 6;
    let currentPage = 1;
    let filteredPosts = [...blogPosts];
    let currentCategory = 'all';
    let currentSearchTerm = '';
    let currentViewMode = 'grid'; // 'grid' or 'list'
    let currentModalIndex = 0;

    // DOM Elements
    const gridView = document.getElementById('gridView');
    const listView = document.getElementById('listView');
    const blogPostsGrid = document.getElementById('blogPosts');
    const blogPostsList = document.getElementById('blogPostsList');
    const featuredPostsContainer = document.getElementById('featuredPosts');
    const categoryTagsContainer = document.getElementById('categoryTags');
    const archiveLinksContainer = document.getElementById('archiveLinks');
    const paginationContainer = document.getElementById('pagination');
    const listPaginationContainer = document.getElementById('listPagination');
    const categoryFilter = document.getElementById('categoryFilter');
    const searchInput = document.getElementById('blogSearch');
    const gridViewBtn = document.getElementById('gridViewBtn');
    const listViewBtn = document.getElementById('listViewBtn');
    const modal = document.getElementById('blogModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDate = document.getElementById('modalDate');
    const modalCategory = document.getElementById('modalCategory');
    const modalContent = document.getElementById('modalContent');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.getElementById('modalClose');
    const prevPostBtn = document.getElementById('prevPostBtn');
    const nextPostBtn = document.getElementById('nextPostBtn');

    // Initialize blog display
    function initBlog() {
        renderBlogPosts();
        renderFeaturedPosts();
        renderCategoryTags();
        renderArchiveLinks();
        setupEventListeners();
    }

    // Render blog posts based on current filters, page, and view mode
    function renderBlogPosts() {
        // Apply filters
        applyFilters();
        
        // Calculate pagination
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
        
        // Render posts based on view mode
        if (currentViewMode === 'grid') {
            renderGridView(paginatedPosts);
            renderPagination(paginationContainer, filteredPosts.length);
            gridView.style.display = 'block';
            listView.style.display = 'none';
        } else {
            renderListView(paginatedPosts);
            renderPagination(listPaginationContainer, filteredPosts.length);
            gridView.style.display = 'none';
            listView.style.display = 'block';
        }
    }

    // Apply filters based on category and search term
    function applyFilters() {
        filteredPosts = blogPosts.filter(post => {
            // Category filter
            const categoryMatch = currentCategory === 'all' || post.category === currentCategory;
            
            // Search filter
            const searchMatch = currentSearchTerm === '' || 
                post.title.toLowerCase().includes(currentSearchTerm.toLowerCase()) || 
                post.excerpt.toLowerCase().includes(currentSearchTerm.toLowerCase());
            
            return categoryMatch && searchMatch;
        });
    }

    // Render grid view of blog posts
    function renderGridView(posts) {
        blogPostsGrid.innerHTML = '';
        
        if (posts.length === 0) {
            blogPostsGrid.innerHTML = `
                <div class="no-results">
                    <h3>No posts found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                </div>
            `;
            return;
        }
        
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'blog-card';
            postElement.innerHTML = `
                <div class="blog-card-img">
                    <img src="${post.imageUrl}" alt="${post.title}">
                    <span class="blog-category-badge">${getCategoryName(post.category)}</span>
                </div>
                <div class="blog-card-body">
                    <h4 class="blog-card-title">${post.title}</h4>
                    <p class="blog-card-excerpt">${post.excerpt}</p>
                    <div class="blog-meta">
                        <span class="blog-date">
                            <i class="far fa-calendar-alt"></i> ${post.date}
                            ${post.readTime ? `<span class="blog-read-time">${post.readTime}</span>` : ''}
                        </span>
                        <a href="javascript:void(0);" class="blog-read-more" data-post-id="${post.id}">
                            Read More <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            `;
            blogPostsGrid.appendChild(postElement);
        });

        // Add event listeners to read more buttons
        document.querySelectorAll('.blog-read-more').forEach(button => {
            button.addEventListener('click', function() {
                const postId = parseInt(this.getAttribute('data-post-id'));
                openModal(postId);
            });
        });
    }

    // Render list view of blog posts
    function renderListView(posts) {
        blogPostsList.innerHTML = '';
        
        if (posts.length === 0) {
            blogPostsList.innerHTML = `
                <div class="no-results">
                    <h3>No posts found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                </div>
            `;
            return;
        }
        
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'blog-list-item';
            postElement.innerHTML = `
                <div class="blog-list-img">
                    <img src="${post.imageUrl}" alt="${post.title}">
                </div>
                <div class="blog-list-content">
                    <span class="blog-category-badge">${getCategoryName(post.category)}</span>
                    <h3 class="blog-list-title">${post.title}</h3>
                    <p class="blog-list-excerpt">${post.excerpt}</p>
                    <div class="blog-meta">
                        <span class="blog-date">
                            <i class="far fa-calendar-alt"></i> ${post.date}
                            ${post.readTime ? `<span class="blog-read-time">${post.readTime}</span>` : ''}
                        </span>
                        <a href="javascript:void(0);" class="blog-read-more" data-post-id="${post.id}">
                            Read More <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            `;
            blogPostsList.appendChild(postElement);
        });

        // Add event listeners to read more buttons
        document.querySelectorAll('.blog-read-more').forEach(button => {
            button.addEventListener('click', function() {
                const postId = parseInt(this.getAttribute('data-post-id'));
                openModal(postId);
            });
        });
    }

    // Render featured posts in sidebar
    function renderFeaturedPosts() {
        featuredPostsContainer.innerHTML = '';
        
        const featuredPosts = blogPosts.filter(post => post.featured).slice(0, 3);
        
        featuredPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'featured-post-item';
            postElement.innerHTML = `
                <div class="featured-post-img">
                    <img src="${post.imageUrl}" alt="${post.title}">
                </div>
                <div class="featured-post-content">
                    <h6><a href="javascript:void(0);" data-post-id="${post.id}">${post.title}</a></h6>
                    <div class="featured-post-date">${post.date}</div>
                </div>
            `;
            featuredPostsContainer.appendChild(postElement);
        });

        // Add event listeners to featured post links
        featuredPostsContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                const postId = parseInt(this.getAttribute('data-post-id'));
                openModal(postId);
            });
        });
    }

    // Render category tags in sidebar
    function renderCategoryTags() {
        categoryTagsContainer.innerHTML = '';
        
        // Get unique categories
        const categories = [...new Set(blogPosts.map(post => post.category))];
        
        // Add "All" category
        const allTag = document.createElement('button');
        allTag.className = `category-tag ${currentCategory === 'all' ? 'active' : ''}`;
        allTag.textContent = 'All';
        allTag.setAttribute('data-category', 'all');
        categoryTagsContainer.appendChild(allTag);
        
        // Add other categories
        categories.forEach(category => {
            const categoryTag = document.createElement('button');
            categoryTag.className = `category-tag ${currentCategory === category ? 'active' : ''}`;
            categoryTag.textContent = getCategoryName(category);
            categoryTag.setAttribute('data-category', category);
            categoryTagsContainer.appendChild(categoryTag);
        });

        // Add event listeners to category tags
        categoryTagsContainer.querySelectorAll('.category-tag').forEach(tag => {
            tag.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                currentCategory = category;
                currentPage = 1;
                
                // Update active state
                document.querySelectorAll('.category-tag').forEach(t => {
                    t.classList.remove('active');
                });
                this.classList.add('active');
                
                // Update category filter dropdown
                categoryFilter.value = category;
                
                renderBlogPosts();
            });
        });
    }

    // Render archive links in sidebar
    function renderArchiveLinks() {
        archiveLinksContainer.innerHTML = '';
        
        // Get archive months
        const months = {};
        blogPosts.forEach(post => {
            const date = new Date(post.date);
            const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
            months[monthYear] = (months[monthYear] || 0) + 1;
        });
        
        // Create archive list
        const archiveList = document.createElement('ul');
        
        Object.entries(months).forEach(([month, count]) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <a href="javascript:void(0);">
                    ${month}
                    <span class="archive-count">${count}</span>
                </a>
            `;
            archiveList.appendChild(listItem);
        });
        
        archiveLinksContainer.appendChild(archiveList);
    }

    // Render pagination
    function renderPagination(container, totalPosts) {
        container.innerHTML = '';
        
        if (totalPosts <= postsPerPage) return;
        
        const totalPages = Math.ceil(totalPosts / postsPerPage);
        
        // Previous button
        const prevItem = document.createElement('li');
        prevItem.className = 'page-item';
        prevItem.innerHTML = `
            <a href="javascript:void(0);" class="page-link" ${currentPage === 1 ? 'style="opacity: 0.5; pointer-events: none;"' : ''}>
                <i class="fas fa-chevron-left"></i>
            </a>
        `;
        container.appendChild(prevItem);
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement('li');
            pageItem.className = `page-item ${currentPage === i ? 'active' : ''}`;
            pageItem.innerHTML = `
                <a href="javascript:void(0);" class="page-link" data-page="${i}">${i}</a>
            `;
            container.appendChild(pageItem);
        }
        
        // Next button
        const nextItem = document.createElement('li');
        nextItem.className = 'page-item';
        nextItem.innerHTML = `
            <a href="javascript:void(0);" class="page-link" ${currentPage === totalPages ? 'style="opacity: 0.5; pointer-events: none;"' : ''}>
                <i class="fas fa-chevron-right"></i>
            </a>
        `;
        container.appendChild(nextItem);
        
        // Add event listeners to pagination links
        container.querySelectorAll('.page-link').forEach(link => {
            link.addEventListener('click', function() {
                if (this.innerHTML.includes('fa-chevron-left')) {
                    if (currentPage > 1) {
                        currentPage--;
                        renderBlogPosts();
                    }
                } else if (this.innerHTML.includes('fa-chevron-right')) {
                    if (currentPage < totalPages) {
                        currentPage++;
                        renderBlogPosts();
                    }
                } else {
                    const page = parseInt(this.getAttribute('data-page'));
                    if (page !== currentPage) {
                        currentPage = page;
                        renderBlogPosts();
                    }
                }
            });
        });
    }

    // Get category name with first letter capitalized
    function getCategoryName(category) {
        switch(category) {
            case 'hpc':
                return 'HPC';
            case 'tech':
                return 'Technology';
            default:
                return category.charAt(0).toUpperCase() + category.slice(1);
        }
    }

    // Open modal with post content
    function openModal(postId) {
        const post = blogPosts.find(p => p.id === postId);
        if (!post) return;
        
        // Set current modal index
        currentModalIndex = blogPosts.findIndex(p => p.id === postId);
        
        // Update modal content
        modalTitle.textContent = post.title;
        modalDate.innerHTML = `<i class="far fa-calendar-alt"></i> ${post.date}${post.readTime ? ` | ${post.readTime}` : ''}`;
        modalCategory.textContent = getCategoryName(post.category);
        modalContent.innerHTML = post.content;
        modalImage.src = post.imageUrl;
        modalImage.alt = post.title;
        
        // Update navigation buttons
        updateModalNavigation();
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Update modal navigation buttons
    function updateModalNavigation() {
        prevPostBtn.disabled = currentModalIndex === 0;
        nextPostBtn.disabled = currentModalIndex === blogPosts.length - 1;
    }

    // Navigate to previous post in modal
    function goToPrevPost() {
        if (currentModalIndex > 0) {
            currentModalIndex--;
            const prevPost = blogPosts[currentModalIndex];
            openModal(prevPost.id);
        }
    }

    // Navigate to next post in modal
    function goToNextPost() {
        if (currentModalIndex < blogPosts.length - 1) {
            currentModalIndex++;
            const nextPost = blogPosts[currentModalIndex];
            openModal(nextPost.id);
        }
    }

    // Setup event listeners
    function setupEventListeners() {
        // View toggle buttons
        gridViewBtn.addEventListener('click', function() {
            if (currentViewMode !== 'grid') {
                currentViewMode = 'grid';
                gridViewBtn.classList.add('active');
                listViewBtn.classList.remove('active');
                renderBlogPosts();
            }
        });
        
        listViewBtn.addEventListener('click', function() {
            if (currentViewMode !== 'list') {
                currentViewMode = 'list';
                listViewBtn.classList.add('active');
                gridViewBtn.classList.remove('active');
                renderBlogPosts();
            }
        });
        
        // Category filter
        categoryFilter.addEventListener('change', function() {
            currentCategory = this.value;
            currentPage = 1;
            
            // Update category tags
            document.querySelectorAll('.category-tag').forEach(tag => {
                if (tag.getAttribute('data-category') === currentCategory) {
                    tag.classList.add('active');
                } else {
                    tag.classList.remove('active');
                }
            });
            
            renderBlogPosts();
        });
        
        // Search input
        searchInput.addEventListener('input', function() {
            currentSearchTerm = this.value;
            currentPage = 1;
            renderBlogPosts();
        });
        
        // Modal close button
        modalClose.addEventListener('click', closeModal);
        
        // Modal overlay click to close
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Modal navigation buttons
        prevPostBtn.addEventListener('click', goToPrevPost);
        nextPostBtn.addEventListener('click', goToNextPost);
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (modal.classList.contains('active')) {
                if (e.key === 'Escape') {
                    closeModal();
                } else if (e.key === 'ArrowLeft' && !prevPostBtn.disabled) {
                    goToPrevPost();
                } else if (e.key === 'ArrowRight' && !nextPostBtn.disabled) {
                    goToNextPost();
                }
            }
        });
    }

    // Initialize the blog
    initBlog();
});

// News code
// Show/Hide News Items Functionality
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggleNewsBtn');
    const hiddenNews = document.querySelectorAll('.hidden-news');
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            // Toggle visibility of hidden news items
            hiddenNews.forEach(item => {
                if (item.classList.contains('hidden-news')) {
                    item.classList.remove('hidden-news');
                    item.classList.add('visible-news');
                    // Add fade-in animation
                    item.style.opacity = 0;
                    setTimeout(() => {
                        item.style.opacity = 1;
                        item.style.transition = 'opacity 0.5s ease';
                    }, 10);
                } else {
                    item.classList.add('hidden-news');
                    item.classList.remove('visible-news');
                }
            });
            
            // Toggle button text
            if (toggleBtn.textContent === 'Show More') {
                toggleBtn.textContent = 'Show Less';
            } else {
                toggleBtn.textContent = 'Show More';
                
                // Scroll back to the news section when collapsing
                document.getElementById('news').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Fix for browsers that don't support :has selector
    // Apply class-based border colors
    const newsItems = document.querySelectorAll('.news-item');
    newsItems.forEach(item => {
        const badge = item.querySelector('.news-badge');
        const content = item.querySelector('.news-content');
        
        if (badge && content) {
            if (badge.classList.contains('conference')) {
                content.classList.add('conference-border');
            } else if (badge.classList.contains('hackathon')) {
                content.classList.add('hackathon-border');
            } else if (badge.classList.contains('summer-school')) {
                content.classList.add('summer-school-border');
            } else if (badge.classList.contains('workshop')) {
                content.classList.add('workshop-border');
            }
        }
    });
});
