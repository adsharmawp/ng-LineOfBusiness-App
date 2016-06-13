using APM.WebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using System.Web.OData;

namespace APM.WebAPI.Controllers
{
    [EnableCorsAttribute("http://localhost:51688", "*", "*")]
    public class ProductsController : ApiController
    {
        // GET: api/Products
        [EnableQuery()]
        [ResponseType(typeof(Product))]
        public IHttpActionResult Get()
        {
            try
            {
                var repo = new ProductRepository();
                return Ok(repo.Retrive().AsQueryable());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // GET: api/Products/5
        [Authorize()]
        public IHttpActionResult Get(int id)
        {
            try
            {
                //throw new ArgumentNullException("This is a test");
                Product product;
                var repo = new ProductRepository();
                if (id > 0)
                {
                    var products = repo.Retrive();
                    product = products.FirstOrDefault(p => p.Id == id);
                    if (product == null)
                    {
                        return NotFound();
                    }
                }
                else
                {
                    product = repo.Create();
                }
                return Ok(product);
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // POST: api/Products
        public IHttpActionResult Post([FromBody]Product product)
        {
            try
            {
                if (product == null)
                {
                    return BadRequest("Product cannot be null");
                }

                if(!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var repo = new ProductRepository();
                var newProduct = repo.Save(product);
                if (newProduct == null)
                {
                    return Conflict();
                }
                return Created<Product>(Request.RequestUri + newProduct.Id.ToString(), newProduct);
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // PUT: api/Products/5
        public IHttpActionResult Put(int id, [FromBody]Product product)
        {
            try
            {
                if (product == null)
                {
                    return BadRequest("Product cannot be null");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var repo = new ProductRepository();
                var updatedProduct = repo.Save(id, product);
                if (updatedProduct == null)
                {
                    return Conflict();
                }
                return Ok();
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // DELETE: api/Products/5
        public void Delete(int id)
        {
        }
    }
}
